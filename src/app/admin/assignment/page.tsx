import React from 'react';
import { getAllAssignments } from '@/db/assignment';
import Assignments from '@/components/admin/Assignments';

const AssignmentPage = async () => {
  const assignments = await getAllAssignments();

  return (
    <><Assignments assignments={assignments} /></>
  );
};

export default AssignmentPage;