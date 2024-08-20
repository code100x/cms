'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { FullCourseContent } from '@/db/course';
import Link from 'next/link';
import { useMemo } from 'react';

export default function BreadCrumbComponent({
  rest,
  course,
  fullCourseContent,
  courseContent,
  contentType,
}: {
  fullCourseContent: FullCourseContent[];
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
    return breadcrumbs;
  }, [rest, fullCourseContent, courseContent, contentType]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-[#4E7AFF]" asChild>
              <Link href={'/'}>100xdevs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {generateBreadcrumbs.length > 0 ? (
              <BreadcrumbLink className="text-[#4E7AFF]" asChild>
                <Link href={`/courses/${course.id}`}>{course.title}</Link>
              </BreadcrumbLink>
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
                      <BreadcrumbLink className="font-semibold" asChild>
                        <Link
                          href={`/courses/${course.id}/${finalRouteArray.join('/')}`}
                        >
                          {breadcrumb?.title}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {/* <BreadcrumbSeparator /> */}
                    {index + 1 < array.length && <BreadcrumbSeparator />}
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-gray-500">
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
