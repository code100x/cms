'use client';
import { handleMarkAsCompleted, handleMarkNotesAsCompleted } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type CourseContent = {
  id: number;
  markAsCompleted: boolean;
  type: string;
  notesProgress: boolean;
};

export const MarkCompletedButton = ({
  courseContent,
}: {
    courseContent: CourseContent;
}) => {
  const { id, markAsCompleted, type, notesProgress } = courseContent;
  let contentCompletionStatus = false;
  if (type === 'notion') {
    contentCompletionStatus = notesProgress;
  } else if (type === 'video') {
    contentCompletionStatus = markAsCompleted;
  }
  const [completed, setCompleted] = useState(contentCompletionStatus);
  const toggleCompletion = () => {
    setCompleted((prev : boolean) => !prev);
  };

  useEffect(() => {
    if (type === 'video') {
      handleMarkAsCompleted(completed, id);
    } else if (type === 'notion') {
      handleMarkNotesAsCompleted(completed, id);
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
