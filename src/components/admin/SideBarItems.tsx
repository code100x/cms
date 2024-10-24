import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SideBarItemsProps {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
}
const SideBarItems = ({ label, href, icon: Icon }: SideBarItemsProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  };
  const isActive =
    (pathName === '/' && href === '/') ||
    pathName === href ||
    pathName?.startsWith(`{href}/`);
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative m-2 ml-0 flex items-center gap-x-2 rounded-lg pl-6 text-sm font-[500] text-white transition-all',
        isActive
          ? 'bg-[#1d4ed8] rounded-r-full text-white'
          : 'text-black dark:text-white custom-button custom-text',
        'hover:left-0 hover:transition-all hover:duration-200',
        'hover:bg-blue-700 hover:rounded-r-full',
        
      )}
    >
      <div className="flex items-center gap-x-2 py-4 hover:text-white">
        <Icon
          size={20}
          className='transition-colors duration-300 dark:text-white'
        />
        <p className="text-sm font-semibold transition-colors duration-300 dark:text-white">
          {label}
        </p>
      </div>
    </button>
  );
};

export default SideBarItems;
