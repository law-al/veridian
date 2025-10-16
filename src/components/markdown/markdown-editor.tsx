import { motion } from 'framer-motion';
import { EditorContent, EditorContext } from '@tiptap/react';
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss';
import '@/components/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap-node/list-node/list-node.scss';
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/tiptap-node/heading-node/heading-node.scss';
import '@/components/tiptap-node/image-node/image-node.scss';
import MarkdownEditorMenu from './markdown-editor-menu';
import { useCreateBlogContext } from '@/contexts/create-blog-context';
import useBlogEditor from '@/hooks/use-blog-editor';

export default function MarkdownEditor() {
  const { editor } = useCreateBlogContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='bg-blue-sec/5 p-6 space-y-8'
    >
      <EditorContext.Provider value={{ editor }}>
        <MarkdownEditorMenu editor={editor} />
        <EditorContent
          editor={editor}
          placeholder='Start Writing your masterpiece'
          role='presentation'
        />
      </EditorContext.Provider>
    </motion.div>
  );
}
