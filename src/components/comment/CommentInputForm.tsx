'use client';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { useAction } from '@/hooks/useAction';
import { createMessage } from '@/actions/comment';
import { toast } from 'sonner';
import { FormErrors } from '../FormError';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CommentInsertSchema } from '@/actions/comment/schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

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

  const form = useForm<z.infer<typeof CommentInsertSchema>>({
    resolver: zodResolver(CommentInsertSchema),
    defaultValues: {
      contentId,
      parentId,
      currentPath,
    },
  });
  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { isValid },
  } = form;

  useEffect(() => {
    setValue('contentId', contentId);
    setValue('currentPath', currentPath);
    setValue('parentId', parentId);
  }, []);

  const handleFormSubmit = (data: z.infer<typeof CommentInsertSchema>) => {
    execute({
      content: data.content,
      contentId,
      parentId,
      currentPath,
    });
    reset();
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
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
        ref={formRef}
      >
        <textarea
          id="content"
          {...register('content')}
          className="min-h-[50px] rounded-md border-2 bg-transparent p-4 text-muted-foreground"
          placeholder="Add a public comment..."
        />
        <FormErrors id="content" errors={fieldErrors} />
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            className={`mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700`}
            disabled={isLoading || !isValid}
          >
            Post Comment
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentInputForm;
