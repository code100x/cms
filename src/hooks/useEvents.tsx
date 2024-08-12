import { ContentType } from '@/actions/calendar/types';
import { useEffect, useState } from 'react';
import { useAction } from './useAction';
import { getEvents } from '@/actions/calendar';
import { toast } from 'sonner';

export const useEvents = (courseId: string) => {
  const [events, setEvents] = useState<ContentType[]>();

  const { execute: executeGetEvents } = useAction(getEvents, {
    onSuccess: (data) => {
      setEvents(data);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    executeGetEvents({
      courseId: Number(courseId),
    });
  }, [courseId]);

  return { events };
};
