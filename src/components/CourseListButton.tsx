'use client';

import { useRecoilState } from 'recoil';
import { Button } from './ui/button';
import { CourseList, CourseSheet } from '@/store/atoms/CourseListAtom';

export function CourseListButton() {
  const [listOpen, setListOpen] = useRecoilState(CourseList);
  const [sheetOpen, setSheetOpen] = useRecoilState(CourseSheet);
  return (
    <>
      <Button
        variant={'outline'}
        className="hidden lg:block"
        onClick={() => setListOpen((p) => !p)}
      >
        {listOpen ? 'Hide List' : 'Show List'}
      </Button>
      <Button
        variant={'outline'}
        className="lg:hidden"
        onClick={() => setSheetOpen((p) => !p)}
      >
        {sheetOpen ? 'Hide List' : 'Show List'}
      </Button>
    </>
  );
}
