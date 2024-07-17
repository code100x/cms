'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useAction } from '@/hooks/useAction';
import { createMessage } from '@/actions/comment';
import { toast } from 'sonner';
import { FormErrors } from '../FormError';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { TabType } from '@/actions/types';
import { lastTabTypeAtom } from '@/store/atoms';
import { useSetRecoilState } from 'recoil';

interface CommentInputFormProps {
  contentId: number;
  parentId?: number | undefined;
  tabType?: TabType;
  setReplyInputBox?: Dispatch<SetStateAction<boolean>>;
  replyInputBox?: boolean;
  className?: string;
}

const CommentInputForm = ({
  contentId,
  parentId,
  tabType,
  setReplyInputBox,
  replyInputBox,
  className,
}: CommentInputFormProps) => {
  const [unhideButton, setUnhideButton] = useState(false);
  const setLastTabType = useSetRecoilState(lastTabTypeAtom);
  const currentPath = usePathname();
  const formRef = React.useRef<HTMLFormElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { execute, isLoading, fieldErrors } = useAction(createMessage, {
    onSuccess: () => {
      toast('Comment added');

      formRef.current?.reset();
      if (setReplyInputBox) setReplyInputBox(false);
      if (parentId) {
        setLastTabType(tabType || TabType.mu);
        router.replace(
          `${currentPath}?tabtype=${TabType.mr}&parentId=${parentId}`,
          { scroll: false },
        );
      }
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
    <form
      className={`grid gap-4 ${className}`}
      onSubmit={handleFormSubmit}
      ref={formRef}
    >
      <textarea
        onFocus={() => setUnhideButton(true)}
        autoFocus={replyInputBox}
        ref={textareaRef}
        id="content"
        name="content"
        className="min-h-[50px] rounded-md border-2 p-2 text-muted-foreground outline-none focus:outline-1 focus:outline-white dark:bg-gray-800"
        placeholder={`Add a public ${parentId ? 'reply' : 'comment'}...`}
      />
      <FormErrors id="content" errors={fieldErrors} />
      <div className={`${!unhideButton && 'hidden'} flex justify-end gap-2`}>
        <Button
          type="button"
          variant={'ghost'}
          className={`${isLoading && 'hidden'}`}
          onClick={() => {
            setUnhideButton(false);
            if (setReplyInputBox) setReplyInputBox(false);
            formRef.current?.reset();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className={`${isLoading && 'opacity-80'}`}
          disabled={isLoading}
        >
          {parentId ? 'Reply' : 'Comment'}
        </Button>
      </div>
    </form>
  );
};

export default CommentInputForm;
