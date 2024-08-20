import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CourseList } from '@/store/atoms/CourseListAtom';
import { useRecoilState } from 'recoil';

export function CourseListSheet() {
  const [isListOpen, setIsListOpen] = useRecoilState(CourseList);
  return (
    <Sheet open={isListOpen} onOpenChange={setIsListOpen}>
      <SheetTrigger></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
