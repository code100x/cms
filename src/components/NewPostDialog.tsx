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

import { useTheme } from 'next-themes';
import { getUpdatedUrl, searchParamsToObject } from '@/lib/utils';
import { FormPostInput } from './posts/form/form-input';
import { FormPostErrors } from './posts/form/form-errors';
import SearchBar from './search/SearchBar';

export const NewPostDialog = () => {
  const { theme } = useTheme();
  const formRef = useRef<ElementRef<'form'>>(null);
  const searchParam = useSearchParams();
  const paramsObject = searchParamsToObject(searchParam);
  const path = usePathname();
  const router = useRouter();
  const [value, setValue] = useState<string>('**Hello world!!!**');
  const [videoId, setVideoId] = useState<number | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
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
    const data: {
      title: string;
      content: string;
      tags: string[];
      videoId?: number | undefined;
    } = {
      title: title?.toString() || '',
      content: value,
      tags: (tags?.toString() || '').split(','),
    };
    if (videoId && videoId !== null && videoId !== undefined) {
      data.videoId = Number(videoId);
    } else {
      data.videoId = undefined;
    }

    execute(data);
    setVideoId(null);
    setVideoTitle(null);
  };

  const handleSearchClick = (videoId?: number, videoTitle?: string) => {
    console.log(videoId, videoTitle);
    if (videoId && videoTitle) {
      setVideoId(videoId);
      setVideoTitle(videoTitle);
    } else {
      toast.error('There was some problem while selecting the video');
    }
  };

  return (
    <Modal ref={ref} onClose={handleOnCloseClick}>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        style={{
          overflow: 'scroll',
        }}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div
            ref={containerRef}
            className="relative z-10 h-fit w-full max-w-3xl space-y-4 rounded-lg bg-white p-2 pt-8 shadow-lg dark:bg-gray-800 md:max-w-4xl"
          >
            <button
              type="button"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
              onClick={handleOnCloseClick}
            >
              x
            </button>
            <FormPostInput
              id="title"
              placeholder="Enter question title..."
              errors={fieldErrors}
            />
            <SearchBar onCardClick={handleSearchClick} shouldRedirect={false} />
            {videoTitle && (
              <div className="mt-2 inline-block rounded-full bg-background px-3 py-1 text-sm font-semibold text-inherit">
                Selected Video: {videoTitle}
              </div>
            )}
            <div className="flex-grow">
              <div data-color-mode={theme}>
                <div className="wmde-markdown-var"> </div>
                <MDEditor
                  id="content"
                  value={value}
                  onChange={handleMarkdownChange}
                  height={'fit-content'}
                  minHeight={400}
                  visibleDragbar={false}
                />
                <FormPostErrors id="content" errors={fieldErrors} />
              </div>
            </div>
            <FormPostInput
              id="tags"
              placeholder="Enter tags separated by comma: hello,world"
              errors={fieldErrors}
            />
            <Button
              type="submit"
              className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-center text-sm font-medium hover:bg-gradient-to-br dark:text-white"
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
