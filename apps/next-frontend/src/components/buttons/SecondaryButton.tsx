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
      className="text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
    >
      {children}
    </button>
  );
};
