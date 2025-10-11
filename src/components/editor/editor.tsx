import { Editor, EditorContent, EditorContext, useEditor } from '@tiptap/react';

import '@/components/tiptap-node/paragraph-node/paragraph-node.scss';
import '@/components/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap-node/list-node/list-node.scss';
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/tiptap-node/heading-node/heading-node.scss';
import '@/components/tiptap-node/image-node/image-node.scss';
import EditorMenu from './editor-menu';

export default function MarkdownEditor({ editor }: { editor: Editor | null }) {
  return (
    <div className='bg-purple-50/50 p-6 space-y-8'>
      <EditorMenu editor={editor} />
      <EditorContent
        editor={editor}
        placeholder='Start Writing your masterpeice'
        role='presentation'
      />
    </div>
  );
}
