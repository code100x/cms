import { NextResponse } from 'next/server';
import prisma from '@/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // TODO: Verify User
    // TODO: Hash password
    await prisma.user.create({
      data: {
        email,
        name,
        password,
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
