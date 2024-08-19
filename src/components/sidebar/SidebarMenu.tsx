import { usePathname } from 'next/navigation';
import { getMenuList } from '@/lib/sidebar-menu-list';
import { useRecoilValue } from 'recoil';
import { sidebarOpen } from '@/store/atoms/sidebar';
import { LogOut, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { signOut } from 'next-auth/react';

export function SidebarMenu() {
  const isOpen = useRecoilValue(sidebarOpen);
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  return (
    <TooltipProvider>
      <nav className="h-full">
        <ul className="flex h-full flex-col justify-between">
          <div className="space-y-4 p-4">
            {menuList.map((p, index) => (
              <Link href={p.href} className="flex">
                <li className="flex" key={index}>
                  <div className="h-10 w-10">
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <p.icon className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className={isOpen ? 'hidden' : ' '}
                      >
                        {p.label}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="whitespace-nowrap">{isOpen && p.label}</div>
                </li>
              </Link>
            ))}
          </div>
          <div className="space-y-4 border p-4">
            <Link href={'/'} className="flex gap-6">
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <MessageCircleQuestion className="h-4 w-4" />
                  <TooltipContent
                    side="right"
                    className={isOpen ? 'hidden' : ' '}
                  >
                    Help & Support
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
              <div className="whitespace-nowrap">
                {isOpen && 'Help & Support'}
              </div>
            </Link>
            <button
              className="flex gap-6"
              onClick={() => {
                signOut();
              }}
            >
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <LogOut className="h-4 w-4" />
                  <TooltipContent
                    side="right"
                    className={isOpen ? 'hidden' : ' '}
                  >
                    Logout
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
              <div className="whitespace-nowrap">{isOpen && 'Logout'}</div>
            </button>
          </div>
        </ul>
      </nav>
    </TooltipProvider>
  );
}
