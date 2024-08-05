import React from 'react';

const CardComponent = ({ title, type }: { title: string; type: string }) => {
  // Assuming your title is stored in a variable

  const [, secondPart] = title.split(' | ');

  return (
    <div className="h-[224px] rounded-2xl bg-gradient-to-t from-blue-600 to-indigo-600 p-2 sm:h-[224px] md:h-[180px] lg:h-[224px]">
      <div className="flex h-full flex-col justify-between rounded-xl p-4">
        <div className="my-auto flex flex-col items-center justify-center">
          {type === 'video' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
          )}
          {type === 'notion' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
          )}
          {type === 'folder' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
            </svg>
          )}
          {type === 'course' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          )}
        </div>
        <div className="flex flex-col items-start justify-center gap-0 text-neutral-50">
          <p className="text-bold flex-wrap text-wrap font-bold capitalize tracking-tight md:text-xl">
            {secondPart} {/* Displaying the second part of the title */}
          </p>
          {!secondPart && (
            <p className="text-bold flex-wrap text-wrap font-bold capitalize tracking-tight md:text-xl">
              {title} {/* Displaying the second part of the title */}
            </p>
          )}
          <span>100xdevs</span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
