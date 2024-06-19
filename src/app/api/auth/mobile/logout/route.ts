import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function POST(request: NextRequest) {
  try {
    // TODO: Get userid from somewhere not body
    const body = await request.json();
    await db.user.update({
      where: {
        id: body.userId,
      },
      data: {
        token: null,
      },
    });
    return NextResponse.json({
      message: 'Logout successful',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

