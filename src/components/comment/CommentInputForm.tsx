'use client';
import React, { useState, useEffect } from 'react';
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
  const [comment, setComment] = useState('');
  const { execute, isLoading, fieldErrors } = useAction(createMessage, {
    onSuccess: () => {
      toast('Comment added');
      formRef.current?.reset();
      setComment('');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const content = formData.get('content') as string;
    if (content.trim() === '') {
      toast.error('Comment cannot be empty or whitespace');
      return;
    }
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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[50px] rounded-md border-2 bg-transparent p-4 text-muted-foreground"
        placeholder="Add a public comment..."
      />
      <FormErrors id="content" errors={fieldErrors} />
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          className={`mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700`}
          disabled={isLoading || comment.trim() === ''}
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentInputForm;
