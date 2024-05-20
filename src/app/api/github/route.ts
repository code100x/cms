import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function POST(req: NextRequest) {
  const { value: username, userId } = await req.json();
  try {
    await db.githubUser.upsert({
      where: { userId, isLinked: false },
      create: { userId, username },
      update: { userId, username },
    });
    return NextResponse.json({ message: 'successful' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: 'failed' }, { status: 403 });
  }
}

export async function PUT(req: NextRequest) {
  const { username, email, publicName } = await req.json();
  if (!username) {
    return NextResponse.json(
      { message: 'error while fetching username' },
      { status: 403 },
    );
  }
  try {
    const findUser = await db.githubUser.findUnique({
      where: { username, isLinked: false },
    });
    if (!findUser) {
      return NextResponse.json(
        { message: 'Error while linking account, username is different' },
        { status: 401 },
      );
    }
    const updateInfo = await db.githubUser.update({
      where: { username },
      data: { isLinked: true, email, publicName },
    });

    await db.bountyInfo.updateMany({
      where: { username },
      data: { githubUserId: updateInfo.userId },
    });

    return NextResponse.json({ message: 'successful' }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: 'Error while linking account, username is different' },
      { status: 403 },
    );
  }
}
