'use client';

import { useEffect, useState } from 'react';
import { CreateBookmark } from '../VideoBookmark/CreateModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <CreateBookmark />;
};

export default ModalProvider;
