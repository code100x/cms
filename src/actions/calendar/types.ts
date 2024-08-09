import { z } from 'zod';
import { getEventsSchema } from './schema';

export type getEventsSchemaType = z.infer<typeof getEventsSchema>;

export type ContentType = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};
