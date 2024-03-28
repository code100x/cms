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

    // Removing layout header and footer from print
    const appbar = document.getElementById('appbar-nav');
    const footer = document.getElementById('footer');
    const appbarPlaceholder = document.getElementById('appbar-placeholder');
    if (appbar) {
      appbar.style.display = 'none';
    }
    if (appbarPlaceholder) {
      appbarPlaceholder.style.display = 'none';
    }
    if (footer) {
      footer.style.display = 'none';
    }

    setTimeout(() => {
      print();
      opened = true;
      window.close();
    }, 2000);
  }, []);

  return null;
}
