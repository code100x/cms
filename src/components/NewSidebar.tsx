'use client';
import { SidebarToggle } from './sidebar/SidebarToggle';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar';
import { cn } from '@/lib/utils';
export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full border-r transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen === false ? 'w-[72px]' : 'w-72',
      )}
    >
      <SidebarToggle
        isOpen={sidebarOpen}
        onClick={() => {
          setSidebarOpen((p) => !p);
        }}
      />
      {/* <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
          <Button
            className={cn(
              'mb-1 transition-transform duration-300 ease-in-out',
              sidebarOpen === false ? 'translate-x-1' : 'translate-x-0',
            )}
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo onFooter={false} />
            </Link>
          </Button>
          {/*  <Menu isOpen={sidebar?.isOpen} />   
          </div> */}
      {/*      <SidebarToggle
        onClick={() => {
          setSidebarOpen((p) => !p);
        }}
        isOpen={sidebarOpen ? false : true}
      /> */}
    </aside>
  );
}
