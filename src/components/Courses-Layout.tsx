'use client';
import React from 'react';
import { ContentList } from './CourseList';
import { CourseList } from '@/store/atoms/CourseListAtom';
import { useRecoilValue } from 'recoil';
import { FullCourseContent } from '@/db/course';

export function CoursesLayout({
  children,
  fullCourseContent,
  courseId,
}: {
  children: React.ReactNode;
  fullCourseContent: FullCourseContent[];
  courseId: string;
}) {
  const isListOpen = useRecoilValue(CourseList);
  return (
    <div className="flex">
      {isListOpen && (
        <ContentList
          fullCourseContent={fullCourseContent}
          courseId={courseId}
        />
      )}
      <div className="w-full">{children}</div>
    </div>
  );
}
