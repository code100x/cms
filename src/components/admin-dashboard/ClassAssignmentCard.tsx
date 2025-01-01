'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book, Calendar, Clock, Users } from 'lucide-react';
import AddAssignment from '@/components/admin/AddAssignment';
import { Button } from '@/components/ui/button';
import AddClass from '../scheduled-class/AddClass';
import { convertTo12HourFormat } from '@/utiles/date';
import { format } from 'date-fns';

export interface Assignment {
  id: number;
  title: string;
  course: any;
  description: string;
  dueDate: string;
  dueTime: string;
  createdAt: any;
  updatedAt: any;
}

export interface Class {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  meetingLink: string;
  course: any;
  createdAt: any;
  updatedAt: any;
}
export interface ClassAssignmentCardProps {
  data: Assignment | Class;
  type: 'class' | 'assignment';
}

const ClassAssignmentCard: React.FC<ClassAssignmentCardProps> = ({ data, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex transform flex-col gap-y-2 rounded-lg bg-white p-4 shadow-lg dark:bg-custom-dark dark:shadow-neumorphic-dark">
      <div className="flex flex-col gap-y-1">
        <h2 className="bg-gradient-to-b from-blue-500 to-blue-800 bg-clip-text text-2xl font-bold tracking-wide text-transparent">
          {data.title}
        </h2>
        <div className="flex">
          <span className="flex items-center gap-x-2">
            <Users size={15} />
            <p className="text-xs">Cohort 3.0</p>
          </span>
          <p className="ml-2 mr-2 text-gray-600"> | </p>
          <span className="flex items-center gap-x-2">
            <Book size={15} />
            <p className="text-sm">{data?.course?.title}</p>
          </span>
        </div>
      </div>
      <div className="flex w-full border-b border-t pb-6 pt-6">
        <div className="flex w-2/5 flex-col gap-y-4 border-r">
          <p>{type === 'assignment' ? 'Due date' : 'Scheduled at'}</p>
          <p className="flex items-center text-xs font-semibold text-gray-400">
            {type === 'assignment' && 'dueDate' in data && (
              <>
                <Calendar size={18} className="mr-2" /> {data.dueDate}
              </>
            )}
            {type === 'class' && 'date' in data && (
              <>
                <Calendar size={18} className="mr-2" /> {data.date}
              </>
            )}
          </p>
        </div>
        <div className="ml-4 flex w-3/5 flex-col gap-y-4">
          <p>{type === 'assignment' ? 'Due time' : 'Timing'}</p>
          <p className="flex items-center text-xs font-semibold text-gray-400">
            {type === 'assignment' && 'dueTime' in data && (
              <>
                <Clock size={18} className="mr-2" />
                {convertTo12HourFormat(data.dueTime)}
              </>
            )}
            {type === 'class' && 'startTime' in data && 'endTime' in data && (
              <>
                <Clock size={18} className="mr-2" />
                {convertTo12HourFormat(data.startTime)}
                {' - '}
                {convertTo12HourFormat(data.endTime)}
              </>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 border-b py-2 pb-6">
        <p>Last updated at</p>
        <span className="flex font-semibold">
          <p className="mr-2 mt-2 text-sm text-gray-400">
            {format(new Date(data?.updatedAt), 'MMMM dd, yyyy')} /{' '}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {convertTo12HourFormat(format(new Date(data?.updatedAt), 'HH:mm'))}
          </p>
        </span>
      </div>
      <div className='flex flex-col gap-y-4'>
        <Button
          variant={'branding'}
          className="mt-2"
          onClick={() => setIsModalOpen(true)}
        >
          View Details
        </Button>
        <div>
          {type === 'assignment' && (
            <Button
              variant={'branding'}
              className="w-full"
              onClick={() => router.push(`/admin/assignment/${data.id}`)}
            >
              View Submissions
            </Button>
          )}
          {type === 'class' && 'meetingLink' in data && (
            <Button
              variant={'branding'}
              className="w-full"
              onClick={() =>
                window.open(`https://${data.meetingLink}`, '_blank')
              }
            >
              Join
            </Button>
          )}
        </div>
      </div>

      {isModalOpen &&
        (type === 'assignment' ? (
          <AddAssignment
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            assignment={data}
          />
        ) : (
          <AddClass
            isOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            classData={data}
          />
        ))}
    </div>
  );
};
export default ClassAssignmentCard;
