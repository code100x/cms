'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useAction } from '@/hooks/useAction';
import { createMessage } from '@/actions/comment';
import { toast } from 'sonner';
import { FormErrors } from '../FormError';
import { usePathname } from 'next/navigation';

const CommentInputForm = ({
  contentId,
  parentId = undefined,
}: {
  contentId: number;
  parentId?: number | undefined;
}) => {
  const currentPath = usePathname();
  const formRef = React.useRef<HTMLFormElement>(null);
  const { execute, fieldErrors, isLoading } = useAction(createMessage, {
    onSuccess: () => {
      toast('Comment added');
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const content = formData.get('content') as string;

    if (!content) return;

    execute({
      content,
      contentId,
      parentId,
      currentPath,
    });
  };
  return (
    <form className="grid gap-4" onSubmit={handleFormSubmit} ref={formRef}>
      <textarea
        id="content"
        name="content"
        className="min-h-[50px] rounded-md dark:bg-gray-800 border-2 text-muted-foreground p-2 "
        placeholder="Add a public comment..."
      />
      <FormErrors id="content" errors={fieldErrors} />
      <div className="flex justify-end gap-2">
        <Button loading={isLoading} type="submit" className="w-[100px]">
          Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentInputForm;
