import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import CalendarPageComponent from '@/components/big-calendar/calendar';

const CalendarPage = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    return redirect('/signin');
  }

  const isAdmin =
    process.env.ADMINS?.split(',').includes(session.user.email!) ?? false;

  return (
    <div className="wrapper flex min-h-screen w-full flex-col gap-4">
      <div className="mx-auto my-auto w-full">
        <CalendarPageComponent isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default CalendarPage;
