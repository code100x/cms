'use server';

import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { Event } from '@prisma/client';
import { getServerSession } from 'next-auth';

import { revalidatePath } from 'next/cache';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  const adminEmails = process.env.ADMINS?.split(',') || [];
  return session?.user?.email && adminEmails.includes(session.user.email);
}

export async function fetchEvents() {
  return await prisma.event.findMany();
}

export async function addEvent(
  event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>,
) {
  if (!(await isAdmin())) {
    return { error: 'Unauthorized' };
  }

  await prisma.event.create({ data: event });
  revalidatePath('/');
}

export async function updateEvent(event: Event) {
  if (!(await isAdmin())) {
    return { error: 'Unauthorized' };
  }

  await prisma.event.update({
    where: { id: event.id },
    data: event,
  });
  revalidatePath('/');
}

export async function deleteEvent(id: number) {
  if (!(await isAdmin())) {
    return { error: 'Unauthorized' };
  }

  await prisma.event.delete({ where: { id } });
  revalidatePath('/');
}
