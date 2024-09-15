import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import CalendarPageComponent from '@/components/big-calendar/calendar';
import { Appbar } from '@/components/Appbar';

const CalendarPage = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    return redirect('/signin');
  }

  const isAdmin =
    process.env.ADMINS?.split(',').includes(session.user.email!) ?? false;

  return (
    <div className="wrapper flex min-h-screen">
      <Appbar />
      <CalendarPageComponent isAdmin={isAdmin} />
    </div>
  );
};

export default CalendarPage;
