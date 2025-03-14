'use client';
import React, { useEffect, useState } from 'react';
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
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [commentText, setCommentText] = useState('');
  const formRef = React.useRef<HTMLFormElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { execute, isLoading, fieldErrors } = useAction(createMessage, {
    onSuccess: () => {
      toast.success(`${parentId ? 'Replied' : 'Commented'}`);
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
    setCommentText('');
  };

  const isAllSpaces = (str: string): boolean => /^\s*$/.test(str);

  const isCommentValid = () => {
    return !isAllSpaces(commentText);
  };

  // Function to adjust the height of the textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height based on scroll height
    }
  };

  useEffect(() => {
    if (!isCommentValid() || isLoading) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [commentText]);

  // Effect to handle the initial and dynamic height adjustment
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();
    };

    textareaRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      textareaRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Effect to dynamically adjust textarea height
  useEffect(() => {
    adjustTextareaHeight();
  }, []); // Run on mount
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
    <form
      className="flex flex-col gap-4 rounded-xl"
      onSubmit={handleFormSubmit}
      ref={formRef}
    >
      <textarea
        ref={textareaRef}
        id="content"
        rows={1}
        name="content"
        className="w-full resize-none border-b border-primary/25 bg-transparent p-4 focus:outline-none focus:ring-0"
        placeholder={parentId ? 'Add a reply...' : 'Add a comment...'}
        onChange={(e) => {
          adjustTextareaHeight();
          setCommentText(e.target.value);
        }} // Adjust height on text change
      />
      <FormErrors id="content" errors={fieldErrors} />

      <Button type="submit" disabled={isButtonDisabled} className="w-fit">
        {parentId ? 'Reply' : 'Comment'}
      </Button>
    </form>
  );
};

export default CommentInputForm;
