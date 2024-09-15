'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import useModal from '@/hooks/useModal';
import Modal from './Modal';
import MDEditor from '@uiw/react-md-editor';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAction } from '@/hooks/useAction';
import { createQuestion } from '@/actions/question';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { getUpdatedUrl, searchParamsToObject } from '@/lib/utils';
import { FormPostInput } from './posts/form/form-input';
import { FormPostErrors } from './posts/form/form-errors';
import { X } from 'lucide-react';

export const NewPostDialog = () => {
  const { theme } = useTheme();
  const formRef = useRef<ElementRef<'form'>>(null);
  const searchParam = useSearchParams();
  const paramsObject = searchParamsToObject(searchParam as any); // build fix (eslint)
  const path = usePathname();
  const router = useRouter();
  const [value, setValue] = useState<string>('**Hello world!!!**');
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, onOpen, onClose } = useModal();
  const handleMarkdownChange = (newValue?: string) => {
    if (typeof newValue === 'string') {
      setValue(newValue);
    }
  };
  useEffect(() => {
    let timeoutId: any;
    if (paramsObject.newPost === 'open') {
      onOpen();

      // Cleanup function to clear the timeout
    } else {
      onClose();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose, onOpen, paramsObject.newPost]);

  const { execute, fieldErrors, setFieldErrors } = useAction(createQuestion, {
    onSuccess: (data) => {
      toast.success(`Question "${data.title}" created`);
      formRef?.current?.reset();
      setValue('');
      router.push(`/question/${data.slug}`);
      handleOnCloseClick();
    },
    onError: (error) => {
      toast.error(error);
      handleOnCloseClick();
    },
  });

  const handleOnCloseClick = () => {
    router.push(getUpdatedUrl(`${path}/`, paramsObject, { newPost: 'close' }));
    if (fieldErrors?.content || fieldErrors?.title || fieldErrors?.tags) {
      setFieldErrors({});
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title');

    const tags = formData.get('tags');

    execute({
      title: title?.toString() || '',
      content: value,
      tags: (tags?.toString() || '').split(','),
    });
  };

  return (
    <Modal ref={ref} onClose={handleOnCloseClick}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md" />
      <AnimatePresence>
        <form ref={formRef} onSubmit={onSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              type: 'spring',
              damping: 10,
            }}
            className="fixed inset-0 mx-auto flex w-full max-w-screen-md items-center justify-center p-4 md:max-w-4xl md:p-8"
          >
            <div
              ref={containerRef}
              className="flex max-h-[80vh] w-full flex-col gap-4 overflow-y-auto rounded-xl border border-primary/10 bg-background p-6"
            >
              <div className="flex items-center justify-between gap-4 border-b pb-4">
                <h2 className="text-xl font-bold tracking-tighter md:text-2xl">
                  New Question
                </h2>
                <Button
                  type="button"
                  variant={'destructive'}
                  size={'iconSM'}
                  onClick={handleOnCloseClick}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <div className="flex w-full flex-col gap-2">
                <h3 className="wmde-markdown-var text-lg font-bold tracking-tighter">
                  Title
                </h3>
                <FormPostInput
                  id="title"
                  placeholder="Enter a Title"
                  errors={fieldErrors}
                  className="w-full"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <h3 className="wmde-markdown-var text-lg font-bold tracking-tighter">
                  Tags
                </h3>
                <FormPostInput
                  id="tags"
                  placeholder="Enter tags separated by comma"
                  errors={fieldErrors}
                  className="w-full"
                />
              </div>

              <div
                data-color-mode={theme}
                className="flex w-full flex-col gap-2"
              >
                <h3 className="wmde-markdown-var text-lg font-bold tracking-tighter">
                  Question
                </h3>
                <MDEditor
                  id="content"
                  value={value}
                  onChange={handleMarkdownChange}
                  visibleDragbar={false}
                  className="w-full border-none outline-none focus:border-none"
                />
                <FormPostErrors id="content" errors={fieldErrors} />
              </div>
              <Button type="submit" variant={'branding'} className="md:w-fit">
                Submit Question
              </Button>
            </div>
          </motion.div>
        </form>
      </AnimatePresence>
    </Modal>
  );
};
