import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AssignmentLayout = (props: Props) => {
  return (
    <div className="mt-[5.5rem] flex h-[calc(100vh-36px-4rem)] max-h-full">
      
      <div className="wrapper w-full">{props.children}</div>
    </div>
  );
};

export default AssignmentLayout;
