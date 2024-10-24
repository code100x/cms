import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSubmissionByAssignmentAndUser } from '@/db/submission';
import Submission from '@/components/assignments/Submission';
import { getAssignmentById } from '@/db/assignment';

const SubmissionPage = async ({
  params,
}: {
  params: { assignmentId: string };
}) => {
  const assignmentId = parseInt(params.assignmentId, 10);
  const assignment = await getAssignmentById(assignmentId);
  const session = await getServerSession(authOptions);
  const submittedData = await getSubmissionByAssignmentAndUser(
    assignmentId,
    session?.user?.id ?? '',
  );

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <Submission
          assignment={assignment}
          userId={session?.user?.id}
          submittedData={submittedData}
        />
      </div>
    </div>
  );
};

export default SubmissionPage;
