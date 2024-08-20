import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CollapseMenuButton } from '@/components/sidebar/collapse-menu-button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { getMenuList } from '@/config/menu-options';

interface MenuProps {
  isOpen: boolean | undefined;
}

const Menu = memo(({ isOpen }: MenuProps) => {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <nav className="sidebar z-[30] mt-8 h-full w-full overflow-scroll overflow-x-hidden">
      <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
        {menuList.map(({ groupLabel, menus }, index) => (
          <li
            className={cn('w-full space-y-4', groupLabel ? 'pt-5' : '')}
            key={index}
          >
            {menus.map(
              ({ href, label, icon: Icon, active, submenus }, index) =>
                submenus.length === 0 ? (
                  <div key={index} className="w-full">
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={active ? 'default' : 'ghost'}
                            className={`mb-1 h-10 w-full justify-start rounded-full border-0 text-xl active:border-0 ${active ? 'text-white dark:text-white' : ''}`}
                            asChild
                          >
                            <Link href={href}>
                              <span
                                className={cn(isOpen === false ? '' : 'mr-4')}
                              >
                                <Icon size={20} />
                              </span>
                              <p
                                className={cn(
                                  'max-w-[200px] truncate',
                                  isOpen === false
                                    ? '-translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100',
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                ),
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Menu;
