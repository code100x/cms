import { useEffect, useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

export const useSidebarMediaQuery = (
  minWidth: string,
  atom: RecoilState<boolean>,
) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(atom);

  useEffect(() => {
    const mediaQuery = window.matchMedia(minWidth);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(!e.matches);
      setSidebarOpen(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    setIsSmallScreen(!mediaQuery.matches);
    setSidebarOpen(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [minWidth, setSidebarOpen]);

  return { isSmallScreen, sidebarOpen, setSidebarOpen };
};
