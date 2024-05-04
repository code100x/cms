'use client';
import { useEffect } from 'react';

export function Print() {
  // Some hack for strict mode
  let opened = false;
  useEffect(() => {
    if (opened) return;

    // Adjusting padding and margins for print
    document.querySelectorAll('details').forEach((e) => (e.open = true));
    document.querySelectorAll('header').forEach((e) => {
      e.style.display = 'none';
    });
    document.querySelectorAll('main').forEach((e) => {
      e.style.padding = '0px';
      e.style.margin = '0px';
    });
    document.querySelectorAll('.notion-title').forEach((e: any) => {
      e.style.marginBottom = '0px';
    });

    setTimeout(() => {
      print();
      opened = true;
    }, 1000);
  }, []);

  return null;
}
