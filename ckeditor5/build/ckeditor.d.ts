/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Autosave } from '@ckeditor/ckeditor5-autosave';
import {
  Bold,
  Code,
  Italic,
  Underline,
} from '@ckeditor/ckeditor5-basic-styles';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from '@ckeditor/ckeditor5-image';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table } from '@ckeditor/ckeditor5-table';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
declare class Editor extends ClassicEditor {
  static builtinPlugins: (
    | typeof Alignment
    | typeof AutoImage
    | typeof AutoLink
    | typeof Autoformat
    | typeof Autosave
    | typeof Base64UploadAdapter
    | typeof Bold
    | typeof CloudServices
    | typeof Code
    | typeof CodeBlock
    | typeof Essentials
    | typeof Heading
    | typeof Highlight
    | typeof Image
    | typeof ImageCaption
    | typeof ImageInsert
    | typeof ImageResize
    | typeof ImageStyle
    | typeof ImageToolbar
    | typeof ImageUpload
    | typeof Italic
    | typeof Link
    | typeof LinkImage
    | typeof Paragraph
    | typeof PasteFromOffice
    | typeof Table
    | typeof Underline
    | typeof Undo
  )[];
  static defaultConfig: EditorConfig;
}
export default Editor;
