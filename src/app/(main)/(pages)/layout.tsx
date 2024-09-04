import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout(props: Props) {
  return <div className="w-full py-16">{props.children}</div>;
}
