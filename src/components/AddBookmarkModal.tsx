import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { formatTime } from '@/lib/utils';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';
import { createBookmark } from '@/actions/bookmark';
import { FormErrors } from './FormError';
import { useParams } from 'next/navigation';
import { FormEvent } from 'react';

interface IProps {
  timestamp: number;
  onClose: () => void;
  open: boolean;
  contentId: number;
  desc?: string;
  id?: number;
}

const AddBookmarkModal = ({
  timestamp,
  onClose,
  open,
  contentId,
  desc,
  id,
}: IProps) => {
  const params = useParams();
  const courseId = params.courseId[0];

  const { execute, fieldErrors } = useAction(createBookmark, {
    onSuccess: () => {
      toast('Bookmark added', { duration: 3000 });
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const description = formData.get('description') as string;

    execute({
      contentId,
      timestamp,
      description,
      courseId: parseInt(courseId, 10),
      ...(id !== undefined && { id }),
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add bookmark</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="timestamp" className="text-right">
              Timestamp
            </Label>
            <Input
              id="timestamp"
              defaultValue={formatTime(timestamp)}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              className="col-span-3"
              rows={2}
              autoFocus
              defaultValue={desc || ''}
            />
          </div>
          <FormErrors id="description" errors={fieldErrors} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookmarkModal;
