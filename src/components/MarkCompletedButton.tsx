'use client';
import { handleMarkAsCompleted } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type CourseContent = {
  id: number;
  markAsCompleted: boolean;
  type: string;
};

export const MarkCompletedButton = ({
  courseContent,
}: {
    courseContent: CourseContent;
}) => {
  const { id, markAsCompleted, type } = courseContent;
  const [completed, setCompleted] = useState(markAsCompleted);

  const toggleCompletion = () => {
    setCompleted((prev : boolean) => !prev);
  };

  useEffect(() => {
    if (type === 'video') {
      handleMarkAsCompleted(completed, id);
    }
  },[completed, toggleCompletion]);
  return (
  <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="opacity-60 hover:opacity-100 transition-all"
            onClick={toggleCompletion}
          >
            {completed ? (
              <CheckCircle2 color="green" size={32} fill="lightgreen" />
            ) : (
              <CheckCircle2 color="gray" size={32} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} className='text-sm font-semibold capitalize'>
          {completed ? 'Completed' : 'Mark as Completed'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// <button
//   className="flex w-fit rounded-lg border border-gray-200 bg-white px-6 py-2 text-primary/70 transition-all hover:border-green-500 hover:bg-green-200/40 hover:text-green-500 focus-visible:ring-gray-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-green-700 dark:hover:bg-green-800/30 dark:hover:text-green-500 dark:focus-visible:ring-gray-700"
//   onClick={handleMarkAsCompleted}
// >
//   <h1 className="flex items-center gap-2 text-sm font-semibold capitalize">
//     Mark Completed
//     <IoCheckmarkDoneOutline size={20} />
//   </h1>
// </button>
