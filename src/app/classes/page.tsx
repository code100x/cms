import Classes from '@/components/Classes';
import { getAllClasses } from '@/db/class';
import React from 'react';

const ClassesPage = async () => {
    const classData = await getAllClasses();
  return (
    <>
    <Classes classData={classData} />
    </>
  );
};

export default ClassesPage;