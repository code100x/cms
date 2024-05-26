'use client';
import React from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { GoBold } from 'react-icons/go';
import { PiTextItalicBold } from 'react-icons/pi';
import { AiOutlineStrikethrough } from 'react-icons/ai';
import { MdFormatUnderlined } from 'react-icons/md';
import { LuCode } from 'react-icons/lu';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { MdOutlineHorizontalRule } from 'react-icons/md';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { LiaUndoSolid } from 'react-icons/lia';
import { LiaRedoSolid } from 'react-icons/lia';
import Underline from '@tiptap/extension-underline';
import { LuHeading, LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PopoverArrow } from '@radix-ui/react-popover';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-header">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <GoBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <PiTextItalicBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <MdFormatUnderlined />
      </button>
      <Popover>
        <PopoverTrigger
          asChild
          className="w-auto border-t-0 text-custom-light-grey hover:text-custom-light-grey text-base flex justify-between items-center"
        >
          <button
            type="button"
            className={editor.isActive('heading') ? 'is-active' : ''}
          >
            <LuHeading />
          </button>
        </PopoverTrigger>
        <PopoverContent className=" bg-secondary border-0 p-0 w-auto rounded-sm">
          <PopoverArrow />
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className=" hover:bg-muted-foreground text-sm p-3  rounded-none flex justify-start items-center w-full"
          >
            <LuHeading1 className="text-xl" />
            <span className="ml-2 self-center p-0">Large Heading</span>
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className=" hover:bg-muted-foreground text-sm p-3  rounded-none flex justify-start items-center w-full"
          >
            <LuHeading2 className="text-xl" />
            <span className="ml-2 self-center p-0">Medium Heading</span>
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className="hover:bg-muted-foreground text-sm p-3  rounded-none flex justify-start items-center w-full"
          >
            <LuHeading3 className="text-xl" />
            <span className="ml-2 self-center p-0">Small Heading</span>
          </button>
        </PopoverContent>
      </Popover>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <AiOutlineStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <LuCode />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <AiOutlineUnorderedList />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <AiOutlineOrderedList />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MdOutlineHorizontalRule />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <BiMessageRoundedDots />
      </button>
      <div className="tiptap-sub-header">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <LiaUndoSolid />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <LiaRedoSolid />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Underline,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

type TiptapProps = {
  content: string;
  setContent: (value: string) => void;
};

const Tiptap = ({ setContent, content }: TiptapProps) => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      onUpdate={({ editor }) => {
        setContent(editor.getHTML());
      }}
    >
      <></>
    </EditorProvider>
  );
};

export default Tiptap;
