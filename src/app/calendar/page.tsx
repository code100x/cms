import LandingPage from '@/components/big-calendar/calendar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const CalendarPage = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    return redirect('/signin');
  }

  const isAdmin =
    process.env.ADMINS?.split(',').includes(session.user.email!) ?? false;

  return <LandingPage isAdmin={isAdmin} />;
};

export default CalendarPage;
