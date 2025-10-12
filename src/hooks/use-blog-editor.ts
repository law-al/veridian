import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { Image } from '@tiptap/extension-image';
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node';
import { MAX_FILE_SIZE } from '@/lib/tiptap-utils';
import { useState } from 'react';
import { handleImageUpload } from '@/lib/upload-editor-image';

interface UploadedEditorImages {
  public_id: string;
  url: string;
}

export default function useBlogEditor({
  editable = true,
  content = `
  <p>Write out ideas and create your first</p>
  `,
}: {
  editable?: boolean;
  content?: string;
}) {
  const [uploadedEditorImages, setUploadedEditorImages] = useState<
    UploadedEditorImages[]
  >([]);

  const editor = useEditor({
    immediatelyRender: false,
    editable: editable,
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 1,
        upload: async (file, onProgress, abortSignal) => {
          const data = await handleImageUpload(file, onProgress, abortSignal);
          setUploadedEditorImages((prev) => {
            return [...prev, data];
          });
          return data.url;
        },
        onError: (error) => console.error('Upload failed:', error),
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'border-2 border-gray-300 bg-white rounded-md p-4 placeholder:text-gray-400 focus:border-purple-500 active:border-purple-500 min-h-50',
      },
    },

    content: content,
  });

  return { editor, uploadedEditorImages };
}
