import { Skeleton } from '@/components/ui/skeleton';

const LoadingQuestion = () => {
  return (
    <div className="wrapper">
      <div className="flex flex-col space-y-4 p-4 md:p-8">
        <Skeleton className="h-8 w-3/4 md:w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
};

export default LoadingQuestion;
