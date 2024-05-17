'use client';
import { useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { useRecoilState } from 'recoil';
import { contentAtom } from '@/store/atoms';
import { toast } from 'sonner';
import NewBlogDialog from '@/components/NewBlogDialog';
import { useRouter } from 'next/navigation';
import { DefaultEditor } from '@/components/DefaultEditor';

export default () => {
  const [editor, setEditor] = useState<EditorJS | null>(null);
  const [content, setContent] = useRecoilState(contentAtom);
  const router = useRouter();
  useEffect(() => {
    const edit = DefaultEditor(
      !content
        ? {
            blocks: [
              {
                type: 'header',
                data: {
                  text: '',
                },
              },
              {
                type: 'paragraph',
                data: {
                  text: 'use "/" command to get started',
                },
              },
            ],
          }
        : content,
      false,
    );
    setEditor(edit);
  }, [content]);

  return (
    <div className="p-10">
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2"
          onClick={() => {
            editor?.save().then((outputData) => {
              if (outputData.blocks.length < 2) {
                toast.error('Title and Subtitle are required');
                return;
              }
              setContent(outputData);
              editor.destroy();
              router.push('/blog/new?newBlog=open');
            });
          }}
        >
          Publish
        </button>
      </div>
      <NewBlogDialog />
      <div id="editorjs"></div>
    </div>
  );
};
