'use client';

import { CheckIcon, MoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@repo/ui/shad/dropdown-menu';

export function SelectTheme() {
  const { setTheme, theme } = useTheme();
  if (theme)
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <MoonIcon className="mr-2 h-4 w-4" />
          <span>
            Appearance: <span className="ml-1 capitalize">{theme}</span>
          </span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {['light', 'dark', 'system'].map((_theme) => {
              return (
                <DropdownMenuItem
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
