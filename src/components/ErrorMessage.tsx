'use client';
import React, { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return;
  return <p className="p-1 text-red-500">{children}</p>;
};

export default ErrorMessage;
