'use client'

import { NotionRenderer } from '@/components/NotionRenderer';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useRouter, notFound } from 'next/navigation';

export default function NotesRenderer({
  params,
  fullCourseContent
}: {
  params: { courseId: string; notesId: string[] };
  fullCourseContent: any[];
}) {
  const [currPage, setCurrPage] = useState<string>(params.notesId[1]);
  const [prevPage, setPrevPage] = useState<string>('');
  const [nextPage, setNextPage] = useState<string>('');
  const [notionIds, setNotionIds] = useState<[number, number][]>([]);
  const [isValid, setIsValid ] = useState<boolean>(true);
  const router = useRouter();

  const courseId = params.courseId;

  useEffect(() => {
    async function fetchCourseContent() {
      try {
        const notionIds = await findNotionIds(fullCourseContent);
        setNotionIds(notionIds);
        updateNavigationIndices(notionIds);
        let validity = notionIds.some((id)=> id[1] === Number(currPage)); 
        if(!validity){
          setIsValid(false);
        }  
      } catch (error) {
        console.error('Error fetching course content:', error);
      }
    }

    fetchCourseContent();
  }, [courseId, params.notesId]);

  useEffect(() => {
    if (notionIds.length > 0) {
      updateNavigationIndices(notionIds);
    }
  }, [currPage, notionIds]);


  function updateNavigationIndices(notionIds: [number, number][]) {
    const currentIndex = notionIds.findIndex(
      ([parentId, id]) => id === Number(currPage)
    );

    if (currentIndex >= 0) {
      const previousIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;

      setPrevPage(previousIndex >= 0 ? notionIds[previousIndex][1].toString() : '');
      setNextPage(nextIndex < notionIds.length ? notionIds[nextIndex][1].toString() : '');
    }
  }

  function findNotionIds(content: any[]): [number, number][] {
    let notionIds: [number, number][] = [];
    function traverse(items: any[]) {
      for (const item of items) {
        if (item.type === 'folder') {
          const parentId = item.id;
          if (item.children && item.children.length > 0) {
            for (const child of item.children) {
              if (child.type === 'notion') {
                notionIds.push([Number(parentId), child.id]);
              }
            }
          }
        }
      }
    }
    traverse(content);
    return notionIds;
  }


  const onNext = () => {
    const currentIndex = notionIds.findIndex(
      ([parentId, id]) => id === Number(currPage)
    );

    if (currentIndex < notionIds.length - 1) {
      const [nextParentId, nextId] = notionIds[currentIndex + 1];
      router.push(`/courses/${courseId}/notes/${nextParentId}/${nextId}`);
    }
  };

  const onPrev = () => {
    const currentIndex = notionIds.findIndex(
      ([parentId, id]) => id === Number(currPage)
    );

    if (currentIndex > 0) {
      const [prevParentId, prevId] = notionIds[currentIndex - 1];
      router.push(`/courses/${courseId}/notes/${prevParentId}/${prevId}`);
    }
  };

  const renderNotionContent = () => {
    try {
      if (!currPage || !isValid) {
        notFound(); 
      }
      return <NotionRenderer id={currPage} />;
    } catch (error) {
      notFound();
    }
  };
  

  return (
    <div>
      <div className='flex p-2 w-full justify-between'>
        <Button variant={'ghost'} onClick={() => router.push(`/courses/${courseId}/notes`)}>
          All Notes
        </Button>
        <div className='flex space-x-2'>
          <Button variant={'ghost'} onClick={onPrev} disabled={!prevPage}>
            Previous
          </Button>
          <Button variant={'ghost'} onClick={onNext} disabled={!nextPage}>
            Next
          </Button>
        </div>
      </div>

      {renderNotionContent()}

      <div className='flex p-2 w-full justify-between'>
        <Button variant={'ghost'} onClick={() => router.push(`/courses/${courseId}/notes`)}>
          All Notes
        </Button>
        <div className='flex space-x-2'>
          <Button variant={'ghost'} onClick={onPrev} disabled={!prevPage}>
            Previous
          </Button>
          <Button variant={'ghost'} onClick={onNext} disabled={!nextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
