import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const LoginClient = () => {
  return (
    <Link href={'#trustedby'}>
      Login{' '}
      <ChevronRight className="text-white h-4 w-4 ml-1 hover:translate-x-1 ease-in-out duration-200" />
    </Link>
  );
};
