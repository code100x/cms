import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 pb-16 pt-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <Skeleton className="h-8 w-3/4 md:w-1/2" />
        <Skeleton className="h-10 w-full lg:w-64" />
      </div>
      <div className="flex flex-col space-y-8">
        {[1, 2].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-6 w-20" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <Skeleton className="h-36 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
