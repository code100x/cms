import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
  email: z.string().max(100),
  otp: z.string().length(4, 'Invalid otp'),
});

const headers = {
  'Client-Service': process.env.APPX_CLIENT_SERVICE || '',
  'Auth-Key': process.env.APPX_AUTH_KEY || '',
};

export async function GET(req: NextResponse) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const otp = searchParams.get('otp');

  const parseResult = requestBodySchema.safeParse({
    email,
    otp,
  });

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }

  try {
    await axios.get(`https://harkiratapi.classx.co.in/get/otpverify`, {
      params: {
        useremail: parseResult.data.email,
        otp: parseResult.data.otp,
        mydeviceid: '',
        mydeviceid2: '',
      },
      headers,
    });
    return NextResponse.json(
      {
        message: 'OTP verified successfully',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        error?.response?.data?.msg || {
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
