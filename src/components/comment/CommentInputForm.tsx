'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useAction';
import { createMessage } from '@/actions/comment';
import { toast } from 'sonner';
import { FormErrors } from '@/components/FormError';
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
  const { execute, fieldErrors } = useAction(createMessage, {
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
    const ref = textareaRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent shortcuts from affecting video when typing in the textarea
      event.stopPropagation();
    };

    ref?.addEventListener('keydown', handleKeyDown);

    return () => {
      ref?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <form className="grid gap-4" onSubmit={handleFormSubmit} ref={formRef}>
      <textarea
        ref={textareaRef}
        id="content"
        typeof="text"
        name="content"
        className="min-h-[50px] rounded-md dark:bg-gray-800 border-2 text-muted-foreground p-2 "
        placeholder="Add a public comment..."
      />
      <FormErrors id="content" errors={fieldErrors} />
      <div className="flex justify-end gap-2">
        <Button type="submit">Comment</Button>
      </div>
    </form>
  );
};

export default CommentInputForm;
