'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminDashboardButton = () => {
  const path = usePathname();

  if (path.includes('admin')) {
    return null;
  }

  return (
    <Link href={'/admin'}>
      <Button className="xs:flex bg-green-400 text-black dark:bg-green-600 dark:text-white">
        Admin<span className="hidden sm:inline">&nbsp;Dashboard</span> &nbsp;
        <ExternalLink className="h-4 w-4" />
      </Button>
    </Link>
  );
};

export default AdminDashboardButton;
