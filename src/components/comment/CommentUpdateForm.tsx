'use client';
import { Pencil } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useAction } from '@/hooks/useAction';
import { updateComment } from '@/actions/comment';
const CommentUpdateForm = ({ commentId, comment, setDropOpen }: any) => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const [prevText, setPt] = useState('');
  const [text, setT] = useState('');
  useEffect(() => {
    setT(comment);
    setPt(comment);
  }, []);
  const { execute } = useAction(updateComment, {
    onSuccess: () => {
      toast('Comment updated successfully');
      setDropOpen(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleUpdate = async () => {
    const ff = text.trim();
    if (ff === prevText || ff.length === 0) {
      //setOpen(false);
      toast.error('fill the required field :(');
      return;
    }
    const body = {
      content: ff,
      commentId,
      currentPath,
    };
    execute(body);
  };
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission

      handleUpdate();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="mx-[2px] flex cursor-pointer items-center gap-x-2 rounded-sm py-[7px] pl-1.5 text-[13.5px] transition duration-300 hover:bg-white hover:bg-opacity-15 hover:backdrop-blur-lg"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <p>Update</p>
          <Pencil className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Comment</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form className="mx-4 my-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label>Comment</label>
              <Input
                value={text}
                onChange={(e: any) => {
                  e.preventDefault();
                  setT(e.target.value);
                }}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="items-centert flex justify-between gap-3">
              <Button
                variant={'secondary'}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant={'default'}
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CommentUpdateForm;
