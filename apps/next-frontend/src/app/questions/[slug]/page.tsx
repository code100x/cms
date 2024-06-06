import { getDisabledFeature } from '@repo/common/lib/utils';
import { redirect } from 'next/navigation';

const page = () => {
  const disabled = getDisabledFeature('qa');
  if (disabled) {
    redirect('/');
  }
  return null;
};

export default page;
