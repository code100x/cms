'use client';
import React, { useState } from 'react';
import AssignmentList from '@/components/assignments/AssignmentList';

const StudentAssignment = ({ assignments, completedAssignments, dueAssignments }: any) => {
  const [activeTab, setActiveTab] = useState('1');
  const tabs = [
    { id: '1', label: 'Forth coming' },
    { id: '2', label: 'Past due' },
    { id: '3', label: 'Completed' },
  ];
  const currentDate = new Date();
  const activeAssignments = assignments?.filter((item:any) => new Date(item.dueDate) > currentDate);

  const renderTabContent  = (activeTab: string) => {
    switch (activeTab) {
      case '1':
        return <AssignmentList assignments={activeAssignments} />;
      case '2':
        return <AssignmentList assignments={dueAssignments} />;
      case '3':
        return <AssignmentList assignments={completedAssignments} />;
    }
  };

  return (
    <div>
      <div className="tab-titles">
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 ${activeTab === tab.id ? 'border-b border-blue-700 text-black dark:text-white' : ''} hover:border-b-2 hover:border-blue-500 hover:text-black dark:hover:text-white`}
          >
            {tab.label}
          </button>
        ))}
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
};

export default StudentAssignment;
