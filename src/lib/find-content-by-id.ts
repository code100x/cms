import { Folder, Video } from '@/db/course';

import { Content } from '@prisma/client';

export default function findContentById(
  contents: (Folder | Video | Content)[],
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
      // TODO: Fix these
      // @ts-ignore
      return foundContent.children;
    }

    return [foundContent];
  }
  // @ts-ignore
  return findContentById(foundContent.children || [], remainingIds);
}
