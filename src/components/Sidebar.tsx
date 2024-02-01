"use client";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Folder } from "@/db/course";
import { Button } from "./ui/button";
import { BackArrow } from "@/icons/BackArrow";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sidebarOpen as sidebarOpenAtom } from "@/store/atoms/sidebar";
import { useEffect } from "react";
import Link from "next/link";

export function Sidebar({
  courseId,
  fullCourseContent,
}: {
  fullCourseContent: Folder[];
  courseId: string;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);

  useEffect(() => {
    if (window.innerWidth < 500) {
      setSidebarOpen(false);
    }
  }, []);

  const findPathToContent = (
    contents: any,
    targetId: any,
    currentPath: any[] = []
  ): any => {
    for (const content of contents) {
      const newPath = [...currentPath, content.id];
      if (content.id == targetId) {
        return newPath;
      }
      if (content.children) {
        const childPath = findPathToContent(
          content.children,
          targetId,
          newPath
        );
        if (childPath) {
          return childPath;
        }
      }
    }
    return null;
  };

  const navigateToContent = (contentId: any) => {
    const pathArray = findPathToContent(fullCourseContent, contentId);
    if (pathArray) {
      const path = `/courses/${courseId}/${pathArray.join("/")}`;
      router.push(path);
    }
  };

  const renderContent = (contents: any) => {
    return contents.map((content: any) => {
      if (content.children && content.children.length > 0) {
        // This is a folder with children
        return (
          <AccordionItem key={content.id} value={`item-${content.id}`}>
            <AccordionTrigger>{content.title}</AccordionTrigger>
            <AccordionContent>
              {/* Render the children of this folder */}
              {renderContent(content.children)}
              <Link
                href="/submissions"
                className="p-2 inline-flex underline underline-offset-4"
              >
                Submit Assignment
              </Link>
            </AccordionContent>
          </AccordionItem>
        );
      } else {
        // This is a video or a content item without children
        return (
          <div
            key={content.id}
            className="p-2"
            onClick={() => {
              navigateToContent(content.id);
            }}
          >
            {content.title}
          </div>
        );
      }
    });
  };

  if (!sidebarOpen) {
    return (
      <div>
        <ToggleButton
          onClick={() => {
            setSidebarOpen(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-64">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 cursor-pointer">
        <div className="flex">
          <ToggleButton
            onClick={() => {
              setSidebarOpen((s) => !s);
            }}
          />
          <GoBackButton />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {/* Render course content */}
          {renderContent(fullCourseContent)}
        </Accordion>
      </div>
    </div>
  );
}

export function ToggleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      onClick={onClick}
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http:/ewww.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
  );
}

function GoBackButton() {
  const router = useRouter();

  const goBack = () => {
    const pathSegments = window.location.pathname.split("/");

    // Remove the last segment of the path
    pathSegments.pop();

    // Check if it's the last page in the course, then go to root
    if (pathSegments.length <= 2) {
      router.push("/");
    } else {
      const newPath = pathSegments.join("/");
      router.push(newPath);
    }
  };

  return (
    <div className="w-full ml-4">
      {/* Your component content */}
      <Button size={"full"} onClick={goBack}>
        <BackArrow /> <div className="pl-4">Go Back</div>
      </Button>
    </div>
  );
}
