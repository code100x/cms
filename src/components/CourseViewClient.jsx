'use client';

import { useEffect } from 'react';
import { useSidebar } from '@/contexts/sidebarContext';
import { CourseView } from '@/components/CourseView';

export default function CourseViewClient({
    course,
    contentType,
    nextContent,
    courseContent,
    fullCourseContent,
    searchParams,
    possiblePath
}) {
    const { toggleExpanded } = useSidebar();

    useEffect(() => {
        toggleExpanded();
    }, []);

    return (
        <CourseView
            rest={[]}
            course={course}
            contentType={contentType}
            nextContent={nextContent}
            courseContent={courseContent}
            fullCourseContent={fullCourseContent}
            searchParams={searchParams}
            possiblePath={possiblePath}
        />
    );
}