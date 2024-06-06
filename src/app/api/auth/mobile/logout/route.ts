import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body && body.userId) {
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
    } 
      return NextResponse.json(
        { message: 'User Id not available' },
        { status: 400 },
      );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
