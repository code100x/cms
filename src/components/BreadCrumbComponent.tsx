'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Folder } from '@/db/course';
import Link from 'next/link';
import { useMemo } from 'react';

export default function BreadCrumbComponent({
  rest,
  course,
  fullCourseContent,
  courseContent,
  contentType,
}: {
  fullCourseContent: Folder[];
  rest: string[];
  course: any;
  contentType: any;
  courseContent: any;
}) {
  const findChildContent = (contents: any, childId: any) => {
    for (const content of contents) {
      if (content.id === childId) {
        return content;
      } else if (content.children && content.children.length > 0) {
        const childContent: any = findChildContent(content.children, childId);
        if (childContent) {
          return childContent;
        }
      }
    }
    return undefined;
  };

  const generateBreadcrumbs = useMemo(() => {
    const breadcrumbs = [];

    for (let i = 0; i < rest.length; i++) {
      const childId = parseInt(rest[i], 10);

      const childContent = findChildContent(fullCourseContent, childId);

      if (childContent) {
        breadcrumbs.push(childContent);
      }
    }

    // if (courseContent.length > 0 && contentType !== 'folder') {
    //     // breadcrumbs.push(courseContent[0]);
    //     // console.log("courseContent[0] : ", courseContent[0]);
    // }

    return breadcrumbs;
  }, [rest, fullCourseContent, courseContent, contentType]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={'/'}>
              <BreadcrumbLink>100xdevs</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {generateBreadcrumbs.length > 0 ? (
              <Link href={`/courses/${course.id}`}>
                <BreadcrumbLink>{course.title}</BreadcrumbLink>
              </Link>
            ) : (
              <BreadcrumbPage>{course.title}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {generateBreadcrumbs.map((breadcrumb, index, array) => {
            const indexofBreadCrumbId = rest.indexOf(breadcrumb.id.toString());
            let finalRouteArray: any[] = [];
            if (indexofBreadCrumbId !== -1) {
              finalRouteArray = rest.slice(0, indexofBreadCrumbId + 1);
            } else {
              finalRouteArray = [...rest];
            }
            return (
              <>
                {index !== array.length - 1 ? (
                  <>
                    <BreadcrumbItem>
                      <Link
                        href={`/courses/${course.id}/${finalRouteArray.join('/')}`}
                      >
                        <BreadcrumbLink className="font-semibold">
                          {breadcrumb?.title}
                        </BreadcrumbLink>
                      </Link>
                    </BreadcrumbItem>
                    {/* <BreadcrumbSeparator /> */}
                    {index + 1 < array.length && <BreadcrumbSeparator />}
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold">
                      {breadcrumb.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
