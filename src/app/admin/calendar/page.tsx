import React from 'react';
import { getAllClasses } from '@/db/class';
import AdminCalender from '@/components/admin/Calender';

const LiveClassPage: React.FC = async () => {
  const classes = await getAllClasses();
  return (
    <>
      <AdminCalender classes={classes} />
    </>
  );
};

export default LiveClassPage;