"use client";

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from './ArrowUpIcon'; 

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 p-2 bg-blue-500 rounded-full transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} hover:bg-blue-700`}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <ArrowUpIcon /> 
    </button>
  );
}
