import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'Account created sucessfully' },
      { status: 201 },
    );
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: 'Email already taken.' },
        { status: 400 },
      );
    }
    console.log(e);
    return NextResponse.json(
      { error: 'Failed to parse JSON input' },
      { status: 400 },
    );
  }
}
