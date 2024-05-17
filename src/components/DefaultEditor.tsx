import Header from '@editorjs/header';
import AceCodeEditorJS, { AceCodeConfig } from 'ace-code-editorjs';
import { OutputData, ToolConstructable } from '@editorjs/editorjs';
import EditorJS from '@editorjs/editorjs';
import SimpleImage from 'simple-image-editorjs';
import List from '@editorjs/list';
import SI from '@editorjs/simple-image';
import InlineCode from '@editorjs/inline-code';
import Table from '@editorjs/table';
import 'ace-builds/esm-resolver';

export const DefaultEditor = (content: OutputData, isReadOnly: boolean) => {
  const aceConfig: AceCodeConfig = {
    languages: {
      javascript: {
        label: 'JavaScript',
        mode: 'ace/mode/javascript',
      },
      typescript: {
        label: 'TypeScript',
        mode: 'ace/mode/typescript',
      },
      python: {
        label: 'Python',
        mode: 'ace/mode/python',
      },
      cpp: {
        label: 'C/C++',
        mode: 'ace/mode/c_cpp',
      },
      html: {
        label: 'html',
        mode: 'ace/mode/html',
      },
      css: {
        label: 'css',
        mode: 'ace/mode/css',
      },
      plain: {
        label: 'Plain Text',
        mode: 'ace/mode/plain_text',
      },
    },
    options: {
      fontSize: 16,
      minLines: 4,
      theme: 'ace/theme/monokai',
    },
  };

  const edit = new EditorJS({
    holderId: 'editorjs',
    readOnly: isReadOnly,
    tools: {
      header: {
        class: Header as unknown as ToolConstructable,
        config: {
          placeholder: 'Title',
        },
        inlineToolbar: true,
      },
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
      },
      simpleImage: isReadOnly
        ? SI
        : (SimpleImage as unknown as ToolConstructable),
      list: List as unknown as ToolConstructable,
      table: Table as unknown as ToolConstructable,
      code: {
        shortcut: 'CMD+SHIFT+C',
        class: AceCodeEditorJS,
        config: aceConfig,
      },
    },
    data: content,
  });
  return edit;
};
