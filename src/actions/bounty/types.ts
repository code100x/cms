export interface BountySubmissionData {
  prLink: string;
  paymentMethod: string;
  userId: string;
}

export interface AdminApprovalData {
  bountyId: string;
  status: 'approved' | 'rejected';
}
