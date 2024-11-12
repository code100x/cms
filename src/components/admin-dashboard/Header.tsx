import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AddAssignment from '@/components/admin/AddAssignment';
import AddClass from '@/components/scheduled-class/AddClass';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <h1 className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-bold uppercase tracking-wide text-transparent">
        {title}
      </h1>
      <Button
        variant={'branding'}
        className="mt-2"
        onClick={() => setIsModalOpen(true)}
      >
        + Add new {title.toLocaleLowerCase()}
      </Button>
      {isModalOpen &&
        (title === 'Class' ? (
          <AddClass isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        ) : (
          <AddAssignment
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
    </div>
  );
};

export default Header;
