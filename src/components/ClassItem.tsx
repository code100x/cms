'use client';
import React from 'react';
import {  Clock, Radio } from 'lucide-react';
import { convertTo12HourFormat } from '@/utiles/date';
import { Button } from '@/components/ui/button';

const ClassItem = ({ classData }: any) => {
    const { title, course: { title: courseTitle }, date, startTime, endTime, meetingLink } = classData;
    const isPast = new Date(date) < new Date();
    console.log(' isPast : ', isPast);
    const parsedStartTime = convertTo12HourFormat(startTime);
    const parsedEndTime = convertTo12HourFormat(endTime);
    return (
      <div className="flex justify-between items-center dark:bg-gray-800 text-white rounded-lg p-4 m-2 bg-custom-light shadow-neumorphic">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <span className="text-white font-bold text-lg"><Radio size={20} /></span>
          </div>
          <div>
            <h3 className="text-transparent text-lg font-semibold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text">{title}</h3>
            <p className="text-black dark:text-gray-400 text-sm">{courseTitle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={20} className="text-gray-400" />
          <span className="text-black dark:text-gray-400 text-sm">{parsedStartTime}</span>
          <span className="text-black dark:text-gray-400 text-sm">{" - "}</span>
          <span className="text-black dark:text-gray-400 text-sm">{parsedEndTime}</span>
          {!isPast && (
            <Button
            className="rounded-md bg-blue-500 px-6 py-0 dark:text-white hover:bg-blue-600"
            onClick={() => window.open(`https://${meetingLink}`, '_blank')}
          >
            Join
          </Button>
          )}
          
        </div>
        
      </div>
    );
  };

export default ClassItem;