import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar, dayjsLocalizer, View, Views } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useState } from 'react';

const localizer = dayjsLocalizer(dayjs);

interface CalendarProps {
  inCourse: boolean;
  events: { id: number; title: String; start: Date; end: Date }[];
}

const MyCalendar = ({
  events,
}: {
  events: {
    id: number;
    title: String;
    start: Date;
    end: Date;
  }[];
}) => {
  const [view, setView] = useState<View>(Views.MONTH);

  const [date, setDate] = useState(new Date());

  const onNavigate = useCallback(
    (newDate: Date) => {
      return setDate(newDate);
    },
    [setDate],
  );

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <div>
      <Calendar
        date={date}
        onNavigate={onNavigate}
        localizer={localizer}
        events={events}
        view={view}
        defaultView={Views.MONTH}
        views={['month', 'week', 'day', 'agenda']}
        showMultiDayTimes
        style={{ height: 500 }}
        onView={handleOnChangeView}
      />
    </div>
  );
};

export const CalendarDialog = ({ inCourse, events }: CalendarProps) => {
  if (!inCourse) return null;

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <CalendarIcon />
      </DialogTrigger>
      <DialogContent className="min-w-[900px] max-w-fit">
        <DialogHeader>
          <DialogTitle>Track your progress</DialogTitle>
          <DialogDescription>
            <MyCalendar events={events} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
