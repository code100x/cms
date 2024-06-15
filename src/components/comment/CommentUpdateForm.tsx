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
import axios from 'axios';
import { toast } from 'sonner';
const CommentUpdateForm = ({ commentId, comment }: any) => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const [prevText, setPt] = useState('');
  const [text, setT] = useState('');
  useEffect(() => {
    setT(comment);
    setPt(comment);
  }, []);
  const handleUpdate = async () => {
    const body = {
      content: text,
      commentId,
      currentPath,
    };
    if (text === prevText) {
      return;
    }
    try {
      const res = await axios.patch('/api/comment', body);
      console.log(res);
      setOpen(false);
      toast.success('successfully updated the comment');
    } catch (err) {
      console.log('update comment error', err);
      toast.error('something went wrong');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="flex items-center gap-x-2"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <p>Update</p>
          <Pencil className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Comment</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mx-4 my-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <label>Comment</label>
              <Input
                className="text-white"
                value={text}
                onChange={(e) => {
                  setT(e.target.value);
                }}
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
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CommentUpdateForm;
