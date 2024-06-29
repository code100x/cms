import React from 'react';

import { MouseEventHandler } from 'react';

export const SecondaryButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="mb-2 me-2 w-full rounded-full bg-blue-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {children}
    </button>
  );
};
