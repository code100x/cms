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
    <div className="h-max pb-4 transition-colors duration-500 md:p-8">
      <div className="mb-6 flex flex-col items-start justify-center px-4 pt-3 sm:px-8">
        <div className="my-20 mb-6 text-3xl text-black transition-colors duration-500 dark:text-white">
          <h1 className="font-bold text-black dark:text-white">Calendar</h1>
        </div>

        <div className="w-full max-w-7xl">
          <CalendarPageComponent isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
