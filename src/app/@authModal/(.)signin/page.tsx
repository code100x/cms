'use client';

import { CloseButton } from '@/components/CloseButton';
import Signin from '@/components/Signin';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

export default function SigninModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    router.back();
  }, [router]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSignInSuccess = useCallback(() => {
    setIsOpen(false);
    router.push('/');
  }, [router]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-background py-4 shadow-lg">
        <CloseButton onClick={handleClose} />
        <Signin onSignInSuccess={handleSignInSuccess} />
      </div>
    </div>
  );
}
