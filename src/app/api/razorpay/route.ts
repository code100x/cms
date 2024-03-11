import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import db from '@/db';
import { z } from 'zod';

const schema = z.object({
  course_id: z.number(),
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: NextRequest) {
  const jsonBody = await req.json();
  const body = schema.safeParse(jsonBody);

  if (!body.success) {
    return NextResponse.json(
      {
        error: 'Missing course_id',
      },
      {
        status: 422,
      },
    );
  }

  const course = await db.course.findFirst({
    where: {
      id: body.data.course_id,
    },
  });

  if (!course)
    return NextResponse.json({ error: 'Course Not Found' }, { status: 404 });

  const payment_capture = 1;
  const amount = course.price;
  const options = {
    amount: (amount * 100).toString(),
    currency: 'INR',
    receipt: 'receipt_10',
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);

    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
