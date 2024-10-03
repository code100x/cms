import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const {
      updates,
      contentId,
      adminPassword,
    }: {
      updates: any;
      contentId: number;
      adminPassword: string;
    } = await req.json();
  
    if (adminPassword !== process.env.ADMIN_SECRET) {
      return NextResponse.json({}, { status: 403 });
    }
    await db.videoMetadata.update({
      where: {
        contentId,
      },
      data: updates,
    });
  
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
};
