'use server';

import prisma from '@/db';
import { Event } from '@prisma/client';

import { revalidatePath } from 'next/cache';

export async function fetchEvents() {
  return await prisma.event.findMany();
}

export async function addEvent(
  event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>,
) {
  await prisma.event.create({ data: event });
  revalidatePath('/');
}

export async function updateEvent(event: Event) {
  await prisma.event.update({
    where: { id: event.id },
    data: event,
  });
  revalidatePath('/');
}

export async function deleteEvent(id: number) {
  await prisma.event.delete({ where: { id } });
  revalidatePath('/');
}
