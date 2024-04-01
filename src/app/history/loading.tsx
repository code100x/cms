import { Fragment } from 'react';

export default function Loading() {
  return (
    <div className="px-4 md:px-20 py-5">
      <div className="rounded bg-slate-50 dark:bg-slate-900 h-8 w-40"></div>
      <div className="flex flex-col gap-4 my-4 sm:my-8 max-w-full">
        {[1, 2].map((_, index) => {
          return (
            <Fragment key={index}>
              <div className="rounded bg-slate-50 dark:bg-slate-900 h-6 w-20"></div>
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div>
                    <div
                      className="w-60 h-40 bg-slate-50 dark:bg-slate-900"
                      key={index}
                    />
                    <div className="rounded my-4 bg-slate-50 dark:bg-slate-900 h-4 w-full"></div>
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
