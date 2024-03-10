import { NextResponse } from 'next/server';
import prisma from '@/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // TODO: Verify User
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
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
    return NextResponse.json(
      { error: 'Failed to parse JSON input' },
      { status: 400 },
    );
  }
}
