import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SidebarToggle } from '@/components/sidebar/sidebar-toggle';
import Image from 'next/image';
import { useStore } from '@/hooks/useStore';
import { useSidebarToggle } from '@/hooks/useSidebarToggle';
import Menu from './menu-options';

export const Sidebar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-[30] h-screen -translate-x-full border-r border-secondary transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72',
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md">
        <Button
          className={cn(
            'pointer-events-none mb-1 transition-transform duration-300 ease-in-out',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0',
          )}
          variant="ghost"
        >
          {/* <PanelsTopLeft className='w-6 h-6 mr-1' /> */}
          <div className="mr-auto h-8 w-8">
            <Image
              src={
                'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/main.png'
              }
              unoptimized
              alt="Sidebar Logo"
              width={100}
              height={100}
            />
          </div>
          <h1
            className={cn(
              'whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out',
              sidebar?.isOpen === false
                ? 'hidden -translate-x-96 opacity-0'
                : 'translate-x-0 opacity-100',
            )}
          >
            100xDevs
          </h1>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
};
