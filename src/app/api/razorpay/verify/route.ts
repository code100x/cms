import { NextRequest, NextResponse } from 'next/server';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import db from '@/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(req: NextRequest) {
  const jsonBody = await req.json();
  const razorpay_signature: string | null = req.headers.get(
    'X-Razorpay-Signature',
  );

  if (!razorpay_signature)
    return NextResponse.json({ error: 'Signature not found' }, { status: 404 });

  const isPaymentValid: boolean = validateWebhookSignature(
    JSON.stringify(jsonBody),
    razorpay_signature,
    process.env.RAZORPAY_WEBHOOK_SECRET!,
  );

  if (!isPaymentValid)
    return NextResponse.json(
      { error: 'Payment not verified. Payment signature invalid' },
      { status: 404 },
    );

  const razorpay_order_id: string = jsonBody.payload.payment.entity.order_id;
  const razorpay_payment_id: string = jsonBody.payload.payment.entity.id;
  const userId: string = jsonBody.payload.payment.entity.notes.userId;
  const courseId: number = jsonBody.payload.payment.entity.notes.courseId;

  const receipt: string = jsonBody.payload.payment.entity.notes.receipt;

  if (!receipt)
    return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });

  try {
    await db.$transaction(async (db) => {
      await db.purchase.create({
        data: {
          receiptId: receipt,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          paymentVerified: true,
          purchasedById: userId,
          purchasedCourseId: courseId,
        },
      });

      await db.userPurchases.create({
        data: {
          userId,
          courseId,
        },
      });
    });
    return NextResponse.json(
      { message: 'Purchase Successful' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError)
      return NextResponse.json(
        { message: 'Purchase was successful' },
        { status: 200 },
      );
    console.log(error);
    return NextResponse.json({ error }, { status: 409 });
  }
}
