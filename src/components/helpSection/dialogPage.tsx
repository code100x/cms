import React from 'react';

export default function DialogPage({
  onCloseRequest,
  title,
  children,
}: {
  onCloseRequest: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed rounded inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-600 dark:bg-black opacity-50"
        onClick={onCloseRequest}
      ></div>
      <div className="w-[75vw] h-[85vh] overflow-auto relative bg-slate-300 dark:bg-[#1b1c21] p-10 rounded-xl shadow-lg z-50">
        <button
          className="absolute top-2 text-[30px] right-2 dark:text-gray-400 text-gray-600"
          onClick={onCloseRequest}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold pb-3 border-b-2 border-b-gray-500">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
