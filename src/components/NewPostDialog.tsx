'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import useModal from '@/hooks/useModal';
import Modal from './Modal';
import MDEditor from '@uiw/react-md-editor';
import { usePathname, useSearchParams,useRouter } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';

import { Button } from './ui/button';
import { useAction } from '@/hooks/useAction';
import { createQuestion } from '@/actions/question';
import { toast } from 'sonner';

import { useTheme } from 'next-themes';
import { getUpdatedUrl, searchParamsToObject } from '@/lib/utils';
import { FormPostInput } from './posts/form/form-input';
import { FormPostErrors } from './posts/form/form-errors';

export const NewPostDialog = () => {
  const { theme } = useTheme();
  const formRef = useRef<ElementRef<'form'>>(null);
  const searchParam = useSearchParams();
  const paramsObject = searchParamsToObject(searchParam);
  const path = usePathname();
  const router = useRouter();
  const [value, setValue] = useState<string>('**Hello world!!!**');
  const { ref, onOpen, onClose } = useModal();

  const handleMarkdownChange = (newValue?: string) => {
    if (typeof newValue === 'string') {
      setValue(newValue);
    }
  };

  useEffect(() => {
    if (paramsObject.newPost === 'open') {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen, paramsObject.newPost]);

  const { execute, fieldErrors, setFieldErrors } = useAction(createQuestion, {
    onSuccess: (data) => {
      toast.success(`Question "${data.title}" created`);
      formRef?.current?.reset();
      if (!fieldErrors?.content && !fieldErrors?.title && !fieldErrors?.tags) {
        setValue('');
        router.push(
          getUpdatedUrl(`${path}/`, paramsObject, { newPost: 'close' }),
        );
      }
    },
    onError: (error) => {
      toast.error(error);
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
      <div className="w-full">
        <div className='py-4 px-6 flex justify-between items-center rounded-t-[20px] border-b dark:border-slate-700 border-slate-200'>
          <h2 className='text-2xl font-bold'>Post your doubts</h2>
          <button
            type="button"
            className=""
            onClick={handleOnCloseClick}
          >
            <img src="cross.svg" className='h-10 w-10' alt="close modal"/>
          </button>
        </div>
        <form ref={formRef} onSubmit={onSubmit}>
          <div className='max-h-[400px] overflow-y-scroll'>
            <div className='py-6 px-6'>
              <FormPostInput
                id="title"
                placeholder="Enter question title..."
                errors={fieldErrors}
                className='bg-transparent py-8 px-4 border dark:border-slate-600 border-slate-300 rounded-xl text-lg'
              />
              <FormPostInput
                id="tags"
                placeholder="Enter tags seperated by comma : hello,world"
                errors={fieldErrors}
                className='bg-transparent mt-6 py-8 px-4 border dark:border-slate-600 border-slate-300 rounded-xl text-lg'
              />
              <div className="flex-grow mt-12">
                <div data-color-mode={theme}>
                  <div className="wmde-markdown-var"></div>
                  <MDEditor
                    id="content"
                    value={value}
                    onChange={handleMarkdownChange}
                    style={{ height: '100%' }}
                    height={400}
                    visibleDragbar={false}
                    preview="edit"
                  />
                  <FormPostErrors id="content" errors={fieldErrors} />
                </div>
              </div>
            </div>
          </div>
          <div className='border-t dark:border-slate-700 border-slate-200 py-4 px-6'>
            <Button type="submit" className='ml-auto block px-4'>Post</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
