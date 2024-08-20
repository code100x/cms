import { ChildCourseContent, FullCourseContent } from '@/db/course';

// findContentById
// This is incorrect.
// If the place you are in is a folder
// It returns all the children
// If the place you are in is a video
// It returns an array with that video as the first element.
export default function findContentById(
  contents: FullCourseContent[],
  ids: number[],
):
  | {
      folder: true;
      value: ChildCourseContent[];
    }
  | {
      folder: false;
      value: ChildCourseContent;
    }
  | null {
  if (ids.length === 0) return { folder: true, value: contents };

  const currentId = ids[0];
  const remainingIds = ids.slice(1);

  const foundContent = contents.find((content) => content.id === currentId);

  if (!foundContent) {
    return null;
  } else if (remainingIds.length === 0) {
    if (foundContent.type === 'folder') {
      return { folder: true, value: foundContent.children ?? [] }; // [Object]
    }

    return { folder: false, value: foundContent };
  }

  return findContentById(foundContent?.children || [], remainingIds);
}
