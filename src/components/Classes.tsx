'use client';
import React, { useState } from 'react';
import ClassList from './ClassList';

const Classes = ({ classData }: any) => {
  const [activeTab, setActiveTab] = useState('1');
  const tabs = [
    { id: '1', label: 'Upcoming' },
    { id: '2', label: 'Past' },
  ];
  const currentDate = new Date();
  const activeClasses = classData?.filter((item:any) => new Date(item.date) > currentDate);
  const pastClasses = classData?.filter((item:any) => new Date(item.date) <= currentDate);
  const renderTabContent  = (activeTab: string) => {
    switch (activeTab) {
      case '1':
        return <ClassList classes={activeClasses} />;
      case '2':
        return <ClassList classes={pastClasses} />;
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

export default Classes;
