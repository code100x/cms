import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { revalidatePath } from 'next/cache';
export const PATCH = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.log(session);
    return NextResponse.json({
      error: 'Unauthorized or insufficient permissions',
    });
  }
  const data = await req.json();
  console.log('data', data);

  const comment = await db.comment.update({
    where: {
      id: data.commentId,
    },
    data: {
      content: data.content,
    },
  });
  console.log(comment);
  if (data.currentPath) {
    revalidatePath(data.currentPath);
  }
  return NextResponse.json(
    { message: 'comment updated successfully' },
    { status: 202 },
  );
};
