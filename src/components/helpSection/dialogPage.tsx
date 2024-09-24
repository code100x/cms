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
    <div className="fixed inset-0 z-50 flex items-center justify-center rounded">
      <div className="fixed inset-0 opacity-50" onClick={onCloseRequest}></div>
      <div className="relative z-50 h-[70vh] w-[90vw] overflow-auto rounded-xl bg-slate-300 px-10 py-5 shadow-lg dark:bg-[#202124] sm:w-[75vw]">
        <button
          className="absolute right-2 top-2 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-slate-600 text-[30px] font-bold text-white"
          onClick={onCloseRequest}
        >
          &times;
        </button>
        <h2 className="border-b-2 border-b-gray-500 pb-3 text-2xl font-semibold">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
