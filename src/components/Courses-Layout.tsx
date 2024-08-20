'use client';
import React from 'react';
import { ContentList } from './CourseList';
import { CourseList } from '@/store/atoms/CourseListAtom';
import { useRecoilValue } from 'recoil';

export function CoursesLayout({ children }: { children: React.ReactNode }) {
  const isListOpen = useRecoilValue(CourseList);
  return (
    <div className="flex">
      {isListOpen && <ContentList />}
      <div className="w-full">{children}</div>
    </div>
  );
}
