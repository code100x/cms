import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';
import { z } from 'zod';
import db from '@/db';

const razorPayZodSchema = z.object({
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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    body.data;
  console.log(body.data);

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
      purchasedById: 'cltl5dg9u000098zzkkape0sx',
      purchasedCourseId: 1,
    },
  });

  const newUserPurchases = await db.userPurchases.create({
    data: {
      userId: 'cltl5dg9u000098zzkkape0sx',
      courseId: 1,
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
