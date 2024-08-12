import { z } from 'zod';
import { getEventsSchema } from './schema';
import { ActionState } from '@/lib/create-safe-action';

export type InputTypeGetEvents = z.infer<typeof getEventsSchema>;
export type ReturnTypeGetEvents = ActionState<
  InputTypeGetEvents,
  ContentType[]
>;

export type ContentType = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};
