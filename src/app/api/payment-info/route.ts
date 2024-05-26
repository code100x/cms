/**
 * POST - Add the payment info (upi and Bank details)
 * GET - Get the payment info
 */

import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session?.user.role === 'admin') {
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 },
    );
  }
  const userId = session.user.id;
  const body = await req.formData();

  if (!body.get('accountNumber')) {
    const upiId = body.get('upiId')?.toString();

    const qrCodeImage = body.get('qrCodeImage');
    console.log(qrCodeImage, 'add to S3 account');
    // TODO:Sending the qrCodeImage to S3 and getting a image link
    const link =
      'https://assetscdn1.paytm.com/images/catalog/product/F/FU/FULLAMINATED-PAOCL-870346F991C1DE/1661943487574_20.jpg';

    if (!upiId) return;
    try {
      await db.paymentInfo.upsert({
        where: { githubUserId: userId },
        update: { upiId, qrCodeImage: link },
        create: {
          githubUserId: userId,
          upiId,
          qrCodeImage: link,
        },
      });
    } catch (e) {
      return NextResponse.json(
        { message: 'Error while updating payment info' },
        { status: 402 },
      );
    }
  } else {
    const accountNumber = body.get('accountNumber')?.toString();
    const accountName = body.get('accountName')?.toString();
    const ifscCode = body.get('ifscCode')?.toString();
    const panNumber = body.get('panNumber')?.toString();

    const panCardPdf = body.get('panCardPdf');
    console.log(panCardPdf, 'add to S3 account');
    // TODO:Sending the qrCodeImage to S3 and getting a image link
    const link =
      'https://assetscdn1.paytm.com/images/catalog/product/F/FU/FULLAMINATED-PAOCL-870346F991C1DE/1661943487574_20.jpg';

    try {
      await db.paymentInfo.update({
        where: { githubUserId: userId },
        data: {
          accountName,
          accountNumber,
          ifscCode,
          panNumber,
          panCardPdf: link,
        },
      });
    } catch (e) {
      return NextResponse.json(
        { message: 'Error while updating payment info' },
        { status: 402 },
      );
    }
  }

  return NextResponse.json({ message: 'Success' }, { status: 200 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 },
    );
  }

  const userId = session.user.id;
  try {
    const userInfo = await db.paymentInfo.findUnique({
      where: { githubUserId: userId },
    });
    return NextResponse.json({ userInfo }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: 'Error finding user' },
      { status: 402 },
    );
  }
}
