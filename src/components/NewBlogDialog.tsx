'use client';
import useModal from '@/hooks/useModal';
import Modal from './Modal';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';

import { getUpdatedUrl, searchParamsToObject } from '@/lib/utils';
import { FormPostErrors } from './posts/form/form-errors';
import { useRecoilState } from 'recoil';
import { contentAtom } from '@/store/atoms';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { createBlog } from '@/actions/blog';

export default () => {
  const formRef = useRef<ElementRef<'form'>>(null);
  const searchParam = useSearchParams();
  const paramsObject = searchParamsToObject(searchParam);
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const path = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, onOpen, onClose } = useModal();
  const [content, setContent] = useRecoilState(contentAtom);
  const [isGettingSubmitted, setIsGettingSubmitted] = useState(false);
  const { execute, fieldErrors, setFieldErrors } = useAction(createBlog, {
    onSuccess: (data) => {
      toast.success(`Blog "${data.title}" created`);
      router.push('/blog');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    if (paramsObject.newBlog === 'open') {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen, paramsObject.newBlog]);
  useEffect(() => {
    let tempTitle = null;
    let tempSubTitle = null;
    let tempImageUrl = null;
    const len = content?.blocks.length ? content?.blocks.length : 0;
    for (let i = 0; i < len; i++) {
      const element = content?.blocks[i];
      if (element?.type === 'header') {
        tempTitle = element.data.text;
      } else if (element?.type === 'paragraph') {
        tempSubTitle = element.data.text;
      } else if (element?.type === 'simpleImage') {
        tempImageUrl = element.data.url;
      }
      if (
        tempTitle !== null &&
        tempSubTitle !== null &&
        tempImageUrl !== null
      ) {
        break;
      }
    }

    setTitle(tempTitle);
    setSubTitle(tempSubTitle);
    setImageUrl(tempImageUrl === null ? '' : tempImageUrl);
  }, [content]);

  const handleOnCloseClick = () => {
    router.push(getUpdatedUrl(`${path}/`, paramsObject, { newBlog: 'close' }));
    setFieldErrors({});
  };

  const convertBlobToBase64 = (blobUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open('GET', blobUrl);
      xhr.responseType = 'blob';
      xhr.send();
    });
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGettingSubmitted(true);
    let modifyedTitle = false;
    let modifyedSubTitle = false;
    const blocks: any[] = [];
    const len = content?.blocks.length ? content?.blocks.length : 0;
    for (let i = 0; i < len; i++) {
      const block = content?.blocks[i];
      if (block?.type === 'header' && !modifyedTitle) {
        modifyedTitle = true;
        blocks.push({ ...block, data: { ...block.data, text: title } });
      } else if (block?.type === 'paragraph' && !modifyedSubTitle) {
        modifyedSubTitle = true;
        blocks.push({ ...block, data: { ...block.data, text: subTitle } });
      } else if (block?.type === 'simpleImage') {
        const imageUrl = await convertBlobToBase64(block.data.url);
        blocks.push({
          ...block,
          data: { ...block.data, url: imageUrl },
        });
      } else {
        blocks.push(block);
      }
    }
    setContent(undefined);
    execute({
      title,
      subTitle,
      imageUrl: imageUrl === '' ? ' ' : await convertBlobToBase64(imageUrl),
      blocks: { blocks },
      tags: tags.split(','),
    });
  };

  return (
    <Modal ref={ref} onClose={handleOnCloseClick}>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="fixed inset-0 flex items-center justify-center z-50  p-4 md:p-8">
          <div
            ref={containerRef}
            className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl md:max-w-2xl pt-8 p-2 space-y-4  w-full h-1/2 "
          >
            <h2 className="text-2xl font-bold text-center">Post Preview</h2>
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
              onClick={handleOnCloseClick}
            >
              x
            </button>
            <div className="flex">
              <div className="w-full">
                <Input
                  id="title"
                  className="w-full p-2 border border-none rounded-md font-bold text-2xl bg-transparent"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  id="subTitle"
                  className="w-full p-2 border border-none rounded-md text-lg bg-none bg-transparent"
                  placeholder="Subtitle"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>
              {imageUrl !== '' ? (
                <img
                  src={imageUrl}
                  alt="please choose an image"
                  className="w-2/6 h-1/2"
                />
              ) : null}
            </div>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2"
              placeholder="Enter tags seperated by comma : appdev, webdev"
            />
            <FormPostErrors id="content" errors={fieldErrors} />
            {isGettingSubmitted ? (
              <p>please wait...</p>
            ) : (
              <Button type="submit">Post-it</Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
