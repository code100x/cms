import React from 'react';
import { getSubmissionsByAssignmentId } from '@/db/submission';
import SubmissionList from '@/components/assignments/SubmissionList';

const AssignmentDetailsPage = async (
    {params} : {params: { assignmentId: string}}
) => {
    const assignmentId = parseInt(params.assignmentId, 10);
    const submittedData = await getSubmissionsByAssignmentId(assignmentId);
  return (
    <>
      <SubmissionList submittedData={submittedData}/>
    </>
  );
};

export default AssignmentDetailsPage;