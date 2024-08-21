'use client';

import * as React from 'react';
import { MoonIcon, SunDimIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      variant="outline"
      size="iconSM"
      className="text-slate-500 dark:text-slate-400"
    >
      <SunDimIcon className="scale-1000 h-[1rem] w-[1rem] rotate-0 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:-rotate-0 dark:scale-100" />
    </Button>
  );
}
