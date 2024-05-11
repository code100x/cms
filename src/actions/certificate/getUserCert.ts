'use server';

import { getCertificate } from '@/db/cert';

export const getUserCert = async (certificateId: string) => {
  const certificate = await getCertificate(certificateId);
  return certificate;
};
