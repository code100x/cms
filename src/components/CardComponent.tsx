import React from 'react';
// eslint-disable-next-line
const CardComponent = ({ title, type }: { title: string; type: string }) => {
  // Assuming your title is stored in a variable

  /*   const [, secondPart] = title.split(' | '); */

  return (
    <div className="h-[275px] w-[274] max-w-[320px] rounded-2xl shadow max-sm:h-[275px]">
      <div className="flex h-full flex-col rounded-lg border">
        <div className="flex h-20 flex-col">
          <div className="">
            <div className="relative">
              <img
                src="https://app.100xdevs.com/Content-Cover.png"
                className="h-auto w-full rounded-lg"
                alt="Cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="rounded-xl bg-blue-600 p-1 text-sm">100xdevs</p>
                <p className="text-xl">{title}</p>
              </div>
            </div>
            <div className="flex flex-col pb-2 pl-4 pr-4 pt-2">
              {title}
              <p className="text-sm text-slate-400">Last Updated: 10 Aug 24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
