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

interface Video {
  id: number;
  title: string;
}

export const NewPostDialog = () => {
  const { theme } = useTheme();
  const formRef = useRef<ElementRef<'form'>>(null);
  const searchParam = useSearchParams();
  const paramsObject = searchParamsToObject(searchParam);
  const path = usePathname();
  const router = useRouter();
  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>('**Hello world!!!**');
  const [tags, setTags] = useState<string[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [videoTitleValue, setVideoTitleValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const videoTitleInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, onOpen, onClose } = useModal();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/search?q=videos');
        const data = await response.json();
        //dummy data to test
        // const data = [
        //   { id: 1, title: 'jwt and authentication' },
        //   { id: 2, title: 'Zod and validation' },
        //   { id: 3, title: 'Validation Complete' },
        //   { id: 4, title: 'Introduction to react' },
        //   { id: 5, title: 'useState, useEffect' },
        //   { id: 6, title: 'useRef, useMemo' },
        //   { id: 7, title: 'React Hooks' },
        //   { id: 8, title: 'React Context and summary' },
        // ];

        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleInputClick = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        !containerRef.current?.contains(event.target as Node) &&
        isDropdownOpen
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [containerRef, isDropdownOpen]);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsDropdownOpen(false);
    setVideoTitleValue(video.title);
  };

  const handleRemoveVideo = () => {
    setSelectedVideo(null);
    setVideoTitleValue('');
  };

  const handleMarkdownChange = (newValue?: string) => {
    if (typeof newValue === 'string') {
      setValue(newValue);
    }
  };
  useEffect(() => {
    let timeoutId: any;
    if (paramsObject.newPost === 'open') {
      onOpen();
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
      setTags([]);
      setSelectedVideo(null);
      setVideoTitleValue('');
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
    const videoId = selectedVideo?.id;
    execute({
      title: title?.toString() || '',
      content: value,
      tags,
      videoId,
    });
    setVideoTitleValue('');
    setSelectedVideo(null);
    handleOnCloseClick();
  };

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ',') {
      event.preventDefault();
      const formData = new FormData(formRef.current as HTMLFormElement);
      const tag = formData.get('tags')?.toString().trim().replace(/,+$/, '');

      if (tag) {
        setTags((prevTags) => [...prevTags, tag]);
      }
      if (tagInputRef.current) {
        tagInputRef.current.value = '';
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
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
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="mr-2 flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                      >
                        {tag}
                        <X
                          size={12}
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </span>
                    ))}
                  </div>
                  <FormPostInput
                    id="tags"
                    placeholder="Enter tags separated by comma"
                    errors={fieldErrors}
                    className="w-full"
                    onKeyUp={addTag}
                    ref={tagInputRef}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <h3 className="wmde-markdown-var text-lg font-bold tracking-tighter">
                  Link Video
                </h3>
                <FormPostInput
                  id="video-search"
                  placeholder="Search a video to tag"
                  errors={fieldErrors}
                  onClick={handleInputClick}
                  className="w-full"
                  value={selectedVideo?.title || videoTitleValue}
                  onChange={(e) => {
                    setVideoTitleValue(e.target.value);
                    if (e.target.value === '') {
                      setSelectedVideo(null);
                    }
                  }}
                  disabled={selectedVideo !== null}
                  ref={videoTitleInputRef}
                />

                {selectedVideo && (
                  <button
                    className="ml-2 cursor-pointer"
                    onClick={handleRemoveVideo}
                  >
                    Remove
                  </button>
                )}
                {isDropdownOpen && (
                  <div
                    ref={containerRef}
                    className="h-32 overflow-y-auto rounded-lg bg-gray-200 dark:bg-[#15161D]"
                  >
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search videos"
                      className="w-full px-4 py-2"
                    />
                    {videos
                      .filter((video) =>
                        video.title
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                      )
                      .map((video) => (
                        <div key={video.id}>
                          <a
                            className="block cursor-pointer rounded-lg px-4 py-2 text-white dark:text-white"
                            style={{
                              backgroundColor: 'var(--background)',
                              color: 'var(--text)',
                            }}
                            onClick={() => {
                              handleVideoSelect(video);
                              setSearch('');
                            }}
                          >
                            {video.title}
                          </a>
                        </div>
                      ))}
                  </div>
                )}
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
