import React from 'react';
import { format, parse } from 'date-fns';
import { Calendar, Clock, Webhook } from 'lucide-react';
import { formatDate } from '@/utiles/date';

const AssignmentItem = ({ assignment }: any) => {
    const { title, course: { title: courseTitle }, dueDate, dueTime } = assignment;
    const parsedDueTime = parse(dueTime, 'HH:mm', new Date());
    return (
      <div className="flex justify-between items-center dark:bg-gray-800 text-white rounded-lg p-4 m-2 bg-custom-light shadow-neumorphic">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <span className="text-white font-bold text-lg"><Webhook size={20} /></span>
          </div>
          <div>
            <h3 className="text-transparent text-lg font-semibold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text">{title}</h3>
            <p className="text-black dark:text-gray-400 text-sm">{courseTitle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={20} className="text-gray-400" />
          <span className="text-black dark:text-gray-400 text-sm">{formatDate(dueDate).date}</span>
          <Clock size={20} className="text-gray-400" />
          <span className="text-black dark:text-gray-400 text-sm">{format(parsedDueTime, 'hh:mm a')}</span>
        </div>
      </div>
    );
  };

export default AssignmentItem;