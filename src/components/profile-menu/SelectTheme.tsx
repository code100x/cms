'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '../ui/switch';

export function SelectTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${isDarkMode ? 'text-primary/50' : 'text-blue-600'}`}
      />
      <Switch
        checked={isDarkMode}
        onCheckedChange={(checked: boolean) =>
          setTheme(checked ? 'dark' : 'light')
        }
      />
      <Moon
        className={`h-5 w-5 transition-all duration-300 ${isDarkMode ? 'text-blue-600' : 'text-primary/50'}`}
      />
    </div>
  );
}
