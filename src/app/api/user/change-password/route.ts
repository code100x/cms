import prisma from '@/db';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const headers = {
  'Client-Service': process.env.APPX_CLIENT_SERVICE || '',
  'Auth-Key': process.env.APPX_AUTH_KEY || '',
};

const GetRequestQuery = z.object({
  email: z.string().max(100),
});

const PostRequestBody = z.object({
  email: z.string().max(100),
  newPassword: z
    .string()
    .max(16, 'Password length should be less than 16')
    .min(7, 'Password length should be min 7'),
  otp: z.string().length(4, 'Invalid otp'),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const parseResult = GetRequestQuery.safeParse({ email });

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }

  try {
    const { data } = await axios.get(
      'https://harkiratapi.classx.co.in/get/check_user_exist',
      {
        params: {
          email_or_phone: email,
        },
        headers,
      },
    );

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!data.data || !user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        {
          status: 404,
        },
      );
    }
    await axios.get(
      `https://harkiratapi.classx.co.in/get/checkemailforresetpassword`,
      {
        params: {
          useremail: email,
        },
        headers,
      },
    );

    return NextResponse.json(
      {
        message: 'OTP sent to your registered email.',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        error?.response?.data?.msg ||
          error?.response?.data?.message || {
            message: error.message,
          },
        {
          status: error.status,
        },
      );
    }

    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  const parseResult = PostRequestBody.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }

  try {
    const targetUser = await prisma.user.findFirst({
      where: {
        email: parseResult.data.email,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        {
          status: 404,
        },
      );
    }

    const formData = new FormData();
    formData.append('newpassword', parseResult.data.newPassword);
    formData.append('otp', parseResult.data.otp);
    formData.append('useremail', parseResult.data.email);

    await axios.post(
      'https://harkiratapi.classx.co.in/post/changepasswordwithotpv3',
      formData,
      {
        headers,
      },
    );
    const hashedPassword = await bcrypt.hash(parseResult.data.newPassword, 10);

    await prisma.user.update({
      where: {
        id: targetUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return NextResponse.json({
      message: 'Password changed successfully',
      data: {
        hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return NextResponse.json(error?.response?.data?.msg || error.message, {
        status: error.status,
      });
    }
    return NextResponse.json(
      {
        message: 'Internal server error',
      },
      {
        status: 500,
      },
    );
  }
}
