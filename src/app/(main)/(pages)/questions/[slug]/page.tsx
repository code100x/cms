import { getDisabledFeature } from '@/lib/utils';
import { redirect } from 'next/navigation';

const page = () => {
  const disabled = getDisabledFeature('qa');
  if (disabled) {
    redirect('/questions');
  }
  return null;
};

export default page;
