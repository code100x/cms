'use client';
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build';
import './DoubtEditor.css';
import { contentAtom } from '@/store/atoms';
import { useRecoilState } from 'recoil';

export default () => {
  const [content, setContent] = useRecoilState(contentAtom);
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
      />
    </div>
  );
};
