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
      className="mb-2 me-2 w-full rounded-full px-5 py-2.5 text-center text-sm font-medium text-[#94A3B8]"
    >
      {children}
    </button>
  );
};
