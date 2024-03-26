import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const contentId = searchParams.get('contentId');
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }
  const allBookmarks = await db.bookmarkVideoTimestamp.findMany({
    where: {
      contentId: Number(contentId),
      userId: session.user.id,
    },
  });
  return NextResponse.json(allBookmarks);
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }
  const allBookmarks = await db.bookmarkVideoTimestamp.delete({
    where: {
      id: String(id),
    },
  });
  return NextResponse.json(allBookmarks);
}

export async function POST(req: NextRequest) {
  const { contentId, timestamp, title, description } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }
  const data = {
    contentId: Number(contentId),
    userId: session.user.id,
    timestamp,
    title,
    description,
  };
  const createdRecord = await db.bookmarkVideoTimestamp.create({ data });

  return NextResponse.json(createdRecord);
}
