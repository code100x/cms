import { Fragment } from 'react';

export default function Loading() {
  return (
    <div className="px-4 py-5 md:px-20">
      <div className="h-8 w-40 rounded bg-slate-50 dark:bg-slate-900"></div>
      <div className="my-4 flex max-w-full flex-col gap-4 sm:my-8">
        {[1, 2].map((_, index) => {
          return (
            <Fragment key={index}>
              <div className="h-6 w-20 rounded bg-slate-50 dark:bg-slate-900"></div>
              <div className="flex items-center gap-6">
                {[1, 2, 3, 4].map((_, index) => (
                  <div>
                    <div
                      className="h-36 w-[260px] rounded-md bg-slate-50 dark:bg-slate-900"
                      key={index}
                    />
                    <div className="my-4 h-4 w-full rounded bg-slate-50 dark:bg-slate-900"></div>
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
