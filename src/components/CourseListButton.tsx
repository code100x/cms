'use client';

import { useRecoilState } from 'recoil';
import { Button } from './ui/button';
import { CourseList } from '@/store/atoms/CourseListAtom';

export function CourseListButton() {
  const [listOpen, setListOpen] = useRecoilState(CourseList);
  return (
    <Button variant={'outline'} onClick={() => setListOpen((p) => !p)}>
      {listOpen ? 'Hide List' : 'Show List'}
    </Button>
  );
}
