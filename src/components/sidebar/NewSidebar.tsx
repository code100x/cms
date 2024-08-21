'use client';
import { SidebarToggle } from './SidebarToggle';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '../../store/atoms/sidebar';
import { cn } from '@/lib/utils';
import { Logo } from '../landing/logo/logo';
import { SidebarMenu } from './SidebarMenu';

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full border-r transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen === false ? 'w-[60px]' : 'w-60',
      )}
    >
      <div className="flex h-18 place-items-center justify-end border-b pl-4">
        <div className={sidebarOpen ? 'w-full justify-center' : 'hidden'}>
          <Logo onFooter={false} />
        </div>
        <SidebarToggle
          isOpen={sidebarOpen}
          onClick={() => {
            setSidebarOpen((p) => !p);
          }}
        />
      </div>
      <div className="h-[calc(100vh-72px)]">
        <SidebarMenu />
      </div>
    </aside>
  );
}
