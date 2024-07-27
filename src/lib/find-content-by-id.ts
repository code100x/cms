import { FullCourseContent } from '@/db/course';

export default function findContentById(
  contents: FullCourseContent[],
  ids: number[],
) {
  if (ids.length === 0) return contents;

  const currentId = ids[0];
  const remainingIds = ids.slice(1);

  const foundContent = contents.find((content) => content.id === currentId);

  if (!foundContent) {
    return null;
  } else if (remainingIds.length === 0) {
    if (foundContent.type === 'folder') {
      return foundContent.children;
    }

    return [foundContent];
  }

  return findContentById(foundContent?.children || [], remainingIds);
}
