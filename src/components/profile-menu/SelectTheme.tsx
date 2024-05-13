'use client';

import { CheckIcon, MoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

export function SelectTheme() {
  const { setTheme, theme } = useTheme();
  if (theme)
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <MoonIcon className="mr-2 h-4 w-4" />
          <span>
            Appearance: <span className="capitalize ml-1">{theme}</span>
          </span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {['light', 'dark', 'system'].map((_theme) => {
              return (
                <DropdownMenuItem
                  key={_theme}
                  onClick={() => setTheme(_theme)}
                  className="flex items-center justify-between"
                >
                  <span className="capitalize">{_theme}</span>
                  {theme === _theme && <CheckIcon className="h-4 w-4" />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
}
