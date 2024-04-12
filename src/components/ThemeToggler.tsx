'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ThemeToggler() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function onThemeChange() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <Button
          aria-label="Switch theme"
          variant="outline"
          onClick={onThemeChange}
          size="iconSM"
          className="flex flex-col items-center border  justify-center w-10 h-10   ml-1 overflow-hidden font-medium duration-200 ease-in-out rounded-xl sm:p-4 text-text hover:bg-overlay"
        >
          <AnimatePresence mode="wait">
            {resolvedTheme === 'light' && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key="theme1"
              >
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              </motion.span>
            )}
            {resolvedTheme === 'dark' && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key="theme2"
              >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}
