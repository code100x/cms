
import { deleteMessage } from '@/actions/comment';
import { useAction } from '@/hooks/useAction';
import { Trash2Icon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const CommentDeleteForm: React.FC<{ commentId: number }> = ({ commentId }) => {
  // Using 'const' for variables that don't change
  const currentPath = usePathname();

  // Destructuring 'execute' from 'useAction'
  const { execute } = useAction(deleteMessage, {
    onSuccess: () => {
      toast('Comment deleted');
    },
    onError: (error) => {
      toast.error(error);
    },
  });


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    execute({ commentId, currentPath });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <button type="submit">
        <Trash2Icon className="w-4 h-4" />
      </button>
    </form>
  );
};

export default CommentDeleteForm;
