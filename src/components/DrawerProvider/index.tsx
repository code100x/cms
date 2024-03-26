'use client';

import { useEffect, useState } from 'react';

import { AllBookmarkDrawer } from '../VideoBookmark/AllBookmarkDrawer';

const DrawerProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <AllBookmarkDrawer />;
};

export default DrawerProvider;
