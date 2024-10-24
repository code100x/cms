'use client';
import React from 'react';
import { SubmissionTable } from '@/components/table/SubmissionTable';
import { submissionTableColumns } from '@/components/table/SubmissionTableColumns';

interface SubmissionListProps {
  submittedData: any;
}
const SubmissionList: React.FC<SubmissionListProps> = ({ submittedData }) => {
  return (
    <div className="container mx-auto py-10">
      <SubmissionTable columns={submissionTableColumns} data={submittedData} />
    </div>
  );
};

export default SubmissionList;
