'use client';

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