import { format, parse } from 'date-fns';

export const formatDate = (createdAt: string) => {
  const date = format(new Date(createdAt), 'MMMM d, yyyy');
  const time = format(new Date(createdAt), 'hh:mm a');
  return { date, time };
};

export const convertTo12HourFormat = (time: string): string => {
  const parsedTime = parse(time, 'HH:mm', new Date());
  return format(parsedTime, 'hh:mm a');
};