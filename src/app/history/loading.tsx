import { Fragment } from 'react';

export default function Loading() {
  return (
    <div className="px-5 md:px-20 py-4">
      <div className="rounded bg-slate-50 dark:bg-slate-900 h-8 w-40"></div>
      <div className="flex flex-col gap-4 my-4 sm:my-8 max-w-full">
        {[1, 2].map((_, index) => {
          return (
            <Fragment key={index}>
              <div className="rounded bg-slate-50 dark:bg-slate-900 h-6 w-20"></div>
              <div className="flex items-center gap-6">
                {[1, 2, 3, 4].map((_, index) => (
                  <div>
                    <div
                      className="w-[260px] h-36 bg-slate-50 dark:bg-slate-900 rounded-md"
                      key={index}
                    />
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="w-24 h-4 bg-slate-50 dark:bg-slate-900 rounded-md"></div>
                      <div className="w-16 h-4 bg-slate-50 dark:bg-slate-900 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
