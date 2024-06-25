import React from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

const TwoFactorEnabledButton = ({
  onClick,
  twoFactorEnabled,
}: {
  onClick: () => void;
  twoFactorEnabled: boolean;
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-center rounded-md bg-gray-200 p-2 transition-all duration-300 ease-out hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {twoFactorEnabled ? (
          <FaToggleOn className="text-2xl text-green-500 transition-all duration-300 ease-out" />
        ) : (
          <FaToggleOff className="text-2xl text-red-500 transition-all duration-300 ease-out" />
        )}
      </button>
    </div>
  );
};

export default TwoFactorEnabledButton;
