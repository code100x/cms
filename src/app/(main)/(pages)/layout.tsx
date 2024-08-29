import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout(props: Props) {
  return <div className="h-[calc(100vh-54px)] w-full">{props.children}</div>;
}
