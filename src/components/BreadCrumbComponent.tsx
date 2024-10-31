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
import { Download, Home } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { Button } from './ui/button';

export default function BreadCrumbComponent({
  rest,
  course,
  fullCourseContent,
  courseContent,
  contentType,
  isNotion = false,
}: {
  fullCourseContent: FullCourseContent[];
  rest: string[];
  course: any;
  contentType: any;
  courseContent: any;
  isNotion?: boolean;
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
    <div className="space-y-4 sm:space-y-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-sm text-blue-600" asChild>
                <Link href={'/'}>
                  <Home className="size-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {generateBreadcrumbs.length > 0 ? (
                <BreadcrumbLink className="text-blue-600" asChild>
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-sm font-semibold capitalize text-primary/60"
                  >
                    {course.title}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-sm font-semibold capitalize text-primary">
                  {course.title}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {generateBreadcrumbs.map((breadcrumb, index, array) => {
              const indexofBreadCrumbId = rest.indexOf(
                breadcrumb.id.toString(),
              );
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
                        <BreadcrumbLink asChild>
                          <Link
                            href={`/courses/${course.id}/${finalRouteArray.join('/')}`}
                            className="text-sm font-semibold capitalize text-primary/60"
                          >
                            {breadcrumb?.title}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index + 1 < array.length && <BreadcrumbSeparator />}
                    </>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-sm font-semibold capitalize text-primary">
                        {breadcrumb.title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        {isNotion && (
          <div className="sm:ml-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                window.open(`/pdf/${rest[rest.length - 1]}`, '_blank')
              }
              className="w-full gap-2 sm:w-auto"
            >
              Download PDF
              <Download className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
