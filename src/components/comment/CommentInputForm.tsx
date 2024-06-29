'use client';
import React, { useEffect } from 'react';
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
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { execute, isLoading, fieldErrors } = useAction(createMessage, {
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

    execute({
      content,
      contentId,
      parentId,
      currentPath,
    });
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent shortcuts from affecting video when typing in the textarea
      event.stopPropagation();
    };

    textareaRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      textareaRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <form className="grid gap-4" onSubmit={handleFormSubmit} ref={formRef}>
      <textarea
        ref={textareaRef}
        id="content"
        name="content"
        className="min-h-[50px] rounded-md border-2 p-2 text-muted-foreground dark:bg-gray-800"
        placeholder="Add a public comment..."
      />
      <FormErrors id="content" errors={fieldErrors} />
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          className={`${isLoading && 'opacity-80'}`}
          disabled={isLoading}
        >
          Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentInputForm;
