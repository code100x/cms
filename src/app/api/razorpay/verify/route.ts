import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';
import { z } from 'zod';
import db from '@/db';

const razorPayZodSchema = z.object({
  user_id: z.string(),
  course_id: z.number(),
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function POST(req: NextRequest) {
  const jsonBody = await req.json();

  const body = razorPayZodSchema.safeParse(jsonBody);

  if (!body.success) {
    console.log(body.error);
    return NextResponse.json(
      {
        error: 'Invalid Body',
      },
      { status: 422 },
    );
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    course_id,
    user_id,
  } = body.data;

  const isPaymentValid = validatePaymentVerification(
    {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    process.env.RAZORPAY_SECRET!,
  );

  const newTransaction = await db.transactionForCourse.create({
    data: {
      razorpay_order_id,
      razorpay_paymet_id: razorpay_payment_id,
      razorpay_signature,
      paymentVerified: isPaymentValid,
      purchasedById: user_id,
      purchasedCourseId: course_id,
    },
  });

  const newUserPurchases = await db.userPurchases.create({
    data: {
      userId: user_id,
      courseId: course_id,
    },
  });

  console.log(newTransaction);
  console.log(newUserPurchases);

  try {
    return NextResponse.json({
      msg: 'hello',
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
