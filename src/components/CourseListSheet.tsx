import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { CourseSheet } from '@/store/atoms/CourseListAtom';
import { Accordion } from '@radix-ui/react-accordion';
import React from 'react';
import { useRecoilState } from 'recoil';

export function CourseListSheet({
  children,
}: {
  children: React.JSX.Element[];
}) {
  const [isListOpen, setIsListOpen] = useRecoilState(CourseSheet);
  return (
    <Sheet open={isListOpen} onOpenChange={setIsListOpen}>
      <SheetContent side={'left'}>
        <SheetTitle className="m-4">Course Content</SheetTitle>
        <Accordion type="single" collapsible className="w-full">
          {children}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
