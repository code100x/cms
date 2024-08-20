import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout(props: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full">{props.children}</div>
    </div>
  );
}
