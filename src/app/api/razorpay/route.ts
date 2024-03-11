import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST() {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!,
  });

  const payment_capture = 1;
  const amount = 499;
  const currency = 'INR';
  const options = {
    amount: (amount * 100).toString(),
    currency,
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
