import React from 'react';
import ScheduleClass from '@/components/admin/ScheduleClass';
import { getAllClasses } from '@/db/class';

const Schedule = async () => {
  const classes = await getAllClasses();
  return (
    <>
      <ScheduleClass classes={classes} />
    </>
  );
};

export default Schedule;

