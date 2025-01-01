'use client';
import React, { useEffect, useState } from 'react';
import ClassAssignmentCard, { Assignment } from '@/components/admin-dashboard/ClassAssignmentCard';
import Header from '@/components/admin-dashboard/Header';
import Tab from '@/components/admin-dashboard/Tab';

interface AssignmentsProps {
  assignments: Array<Assignment>;
}
const Assignments: React.FC<AssignmentsProps> = ({ assignments }) => {
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [activeAssignments, setActiveAssignments] = useState<Assignment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    if (tab === 'Scheduled') {
      setActiveAssignments(
        assignments.filter(
          (assignment: Assignment) => {
            const dueDate = new Date(assignment.dueDate);
            dueDate.setHours(0, 0, 0,0);
            return dueDate >= currentDate;
          }
        ),
      );
    } else {
      setActiveAssignments(
        assignments.filter(
          (assignment: Assignment) => {
            const dueDate = new Date(assignment?.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate < currentDate;
          }
        ),
      );
    }
  };

  useEffect(() => {
    handleTabChange('Scheduled');
  }, []);

  const filteredAssignments = activeAssignments?.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
  );

  return (
    <div className="container mx-auto">
      <Header title="Assignments" />
      <Tab
        tabs={['Scheduled', 'History']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments?.length > 0 &&
          filteredAssignments?.map((assignment: Assignment) => (
            <ClassAssignmentCard key={assignment.id} data={assignment} type="assignment" />
          ))}
      </div>
      {!(filteredAssignments?.length > 0) && (
        <div className="h-full w-full p-4 text-center text-8xl font-bold dark:text-gray-600 text-gray-300">
          <p className='mb-4'>No Assignments</p>
          <p>found</p>
        </div>
      )}
    </div>
  );
};

export default Assignments;
