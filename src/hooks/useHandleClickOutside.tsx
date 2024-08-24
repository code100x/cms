import React from 'react';
import { useEffect } from 'react';

export const useHandleClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  isSmallScreen: boolean,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSmallScreen &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSmallScreen, ref, onOutsideClick]);
};
