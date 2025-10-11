import { Editor } from '@tiptap/react';
import { TextAlignButton } from '@/components/tiptap-ui/text-align-button';
import { HeadingButton } from '@/components/tiptap-ui/heading-button';
import { ListButton } from '@/components/tiptap-ui/list-button';
import { BlockquoteButton } from '@/components/tiptap-ui/blockquote-button';
import { CodeBlockButton } from '@/components/tiptap-ui/code-block-button';
import { ImageUploadButton } from '@/components/tiptap-ui/image-upload-button';

export default function EditorMenu({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className='flex items-center gap-3 bg-white rounded-md border border-gray-300 py-2 px-2'>
      <HeadingButton level={1} />
      <HeadingButton level={2} />
      <HeadingButton level={3} />
      <TextAlignButton align='left' />
      <TextAlignButton align='center' />
      <TextAlignButton align='right' />
      <TextAlignButton align='justify' />
      <BlockquoteButton editor={editor} />
      <CodeBlockButton />
      <ListButton editor={editor} type='bulletList' />
      <ListButton editor={editor} type='orderedList' />
      <ImageUploadButton editor={editor} />
    </div>
  );
}
