export interface BountySubmissionData {
  prLink: string;
  paymentMethod: string;
}

export interface AdminApprovalData {
  bountyId: string;
  status: 'approved' | 'rejected';
}
