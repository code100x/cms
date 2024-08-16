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

    document
      .querySelectorAll('.notion-asset-wrapper-video')
      .forEach((e: any) => {
        const thumbnailLink = e
          .getElementsByClassName('notion-yt-thumbnail')[0]
          ?.getAttribute('src');
        const videoId = thumbnailLink?.substring(8).split('/')[2];

        if (videoId) {
          const ytLink = `https://www.youtube.com/watch?v=${videoId}`;

          e.innerHTML = `
            <div class="flex">
              <a class="flex justify-center items-center gap-2 p-2 rounded-lg bg-red-500 font-medium" href="${ytLink}">
                Youtube Video
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right">
                  <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/>
                </svg>
              </a>
            </div>
          `;
        }
      });

    setTimeout(() => {
      print();
      opened = true;
    }, 1000);
  }, []);

  return null;
}
