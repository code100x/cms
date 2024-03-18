import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '../ui/button';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';
import { deleteBookmark } from '@/actions/bookmark';
import { TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IProps {
  onClose: () => void;
  id: number;
}

const DeleteBookmarkModal = ({ onClose, id }: IProps) => {
  const { execute } = useAction(deleteBookmark, {
    onSuccess: () => {
      toast.error('Bookmark deleted', { duration: 3000 });
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleBookmarkDelete = () => {
    execute({
      id,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center">
          <TrashIcon className="mr-3 float-right w-3.5 h-3.5" />
          Delete
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to delete the bookmark?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              handleBookmarkDelete();
              onClose();
            }}
            className={cn(buttonVariants({ variant: 'destructive' }))}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookmarkModal;
