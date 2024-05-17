'use client';
import { getBlog } from '@/actions/blog';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { JsonObject } from '@prisma/client/runtime/library';
import { DefaultEditor } from '@/components/DefaultEditor';

export default () => {
  const { blogId } = useParams();
  useEffect(() => {
    getBlog(Number(blogId)).then((res) => {
      const content = res.data?.content as JsonObject;
      DefaultEditor({ blocks: content.blocks as any[] }, true);
    });
  }, []);

  return <div id="editorjs"></div>;
};
