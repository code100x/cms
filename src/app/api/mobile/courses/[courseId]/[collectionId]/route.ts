import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';

export async function GET(req: NextRequest,{ params }: { params: { collectionId: string } }) {
  try {
    console.log({ params });
    const { collectionId } = params;
    const collectionData = await db.content.findMany({
      where: {
        parentId: parseInt(collectionId, 10),
      },
    });
    return NextResponse.json({
      message: 'Collection Data fetched successfully',
      data: collectionData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error fetching user courses', error },
      { status: 500 },
    );
  }
}
