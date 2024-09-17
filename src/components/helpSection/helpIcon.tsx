'use client';
import React, { useState } from 'react';
import HelpDialog from './helpDialog';

export default function HelpIcon() {
  const [isHelpDialogOpen, setHelpDialogOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setHelpDialogOpen(!isHelpDialogOpen)}
        className="fixed bottom-6 right-5 z-[1000] h-10 w-10 cursor-pointer rounded-md bg-slate-600 p-2 text-white hover:bg-slate-500"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          viewBox="0 0 24 24"
          className=""
          fill="none"
          stroke-width="2"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <g stroke-width="1.5">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="12" r="9"></circle>
            <line x1="12" y1="17" x2="12" y2="17.01"></line>
            <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"></path>
          </g>
        </svg>
      </div>

      {isHelpDialogOpen && (
        <HelpDialog onClose={() => setHelpDialogOpen(false)} />
      )}
    </>
  );
}
