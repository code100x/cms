import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import db from '@/db';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const schema = z.object({
  courseId: z.number(),
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json(
      {
        error: 'No user found',
      },
      {
        status: 404,
      },
    );
  const userId = session.user.id;
  const reqBody = await req.json();
  const body = schema.safeParse(reqBody);

  if (!body.success) {
    return NextResponse.json(
      {
        error: 'Error parsing the body of the request',
      },
      {
        status: 422,
      },
    );
  }

  const course = await db.course.findFirst({
    where: {
      id: body.data.courseId,
    },
  });

  if (!course)
    return NextResponse.json({ error: 'Course Not Found' }, { status: 404 });

  const purchased = await db.userPurchases.findFirst({
    where: {
      userId,
      courseId: body.data.courseId,
    },
  });

  if (purchased)
    return NextResponse.json(
      { error: 'Course already purchased' },
      { status: 409 },
    );

  const receipt = await db.receipt.create({
    data: {
      userId,
      courseId: body.data.courseId,
    },
  });

  const payment_capture = 1;
  const amount = course.price;
  const options = {
    amount: (amount * 100).toString(),
    currency: 'INR',
    receipt: receipt.id,
    payment_capture,
    notes: {
      userId,
      courseId: body.data.courseId,
      receipt: receipt.id,
    },
  };

  try {
    const response = await razorpay.orders.create(options);

    await db.receipt.update({
      where: {
        id: receipt.id,
      },
      data: {
        razorpayOrderId: response.id,
      },
    });

    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      razorPayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
