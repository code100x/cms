'use client';
import React from 'react';
import { ContentList } from './CourseList';

export function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="hidden w-[282px] min-w-56 lg:inline-block">
        <ContentList />
      </div>
      <div>{children}</div>
    </div>
  );
}
