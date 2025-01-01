'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ClassAssignmentCard, { Class } from '@/components/admin-dashboard/ClassAssignmentCard';
import Header from '@/components/admin-dashboard/Header';
import Tab from '@/components/admin-dashboard/Tab';

interface ClassesProps {
  classes: Array<Class>;
}
const ScheduleClass: React.FC<ClassesProps> = ({classes}) => {
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [activeClasses, setActiveClasses] =
    useState<Class[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const currentDate = format(new Date(), 'MMMM dd, yyyy');
    if (tab === 'Scheduled') {
      setActiveClasses(classes.filter((item:Class) => format(new Date(item.date), 'MMMM dd, yyyy') >= currentDate));
    } else {
      setActiveClasses(classes.filter((item:Class) => format(new Date(item.date), 'MMMM dd, yyyy') < currentDate));
    }
  };

  useEffect(() => {
    handleTabChange('Scheduled');
  },[]);

  const filteredClasses = activeClasses?.filter((item) => 
    item.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div className="container mx-auto">
      <Header title="Class" />
      <Tab
        tabs={['Scheduled', 'History']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses?.length > 0 && (
          filteredClasses?.map((item: any) => (
            <ClassAssignmentCard key={item.id} data={item} type='class' />
          ))
        )}
      </div>
      {!(filteredClasses?.length > 0) && (
        <div className="h-full w-full p-4 text-center text-8xl font-bold dark:text-gray-600 text-gray-300">
          <p className='mb-4'>No Classes</p>
          <p>found</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleClass;
