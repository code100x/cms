import React from 'react';

export const PrimaryButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="mb-2 me-2 w-full rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {children}
    </button>
  );
};
