import React from 'react';
import { getSubmissionById } from '@/db/submission';
import SubmissionReview from '@/components/assignments/SubmissionReview';

const SubmissionReviewPage = async ({ params }: { params: { submissionId : string } }) => {
    const submissionId = parseInt(params.submissionId, 10);
    const submission = await getSubmissionById(submissionId);
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <div className="max-w-xl w-full p-4">
          <SubmissionReview submission={submission} />
        </div>
      </div>
    );
};

export default SubmissionReviewPage;