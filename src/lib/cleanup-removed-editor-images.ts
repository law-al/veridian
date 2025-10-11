import { Editor } from '@tiptap/core';
import axiosInstance from './axios-instance';

interface UploadedEditorImages {
  public_id: string;
  url: string;
}

export default async function cleanupRemovedEditorImages({
  editor,
  uploadedEditorImages,
}: {
  editor: Editor | null;
  uploadedEditorImages: UploadedEditorImages[];
}) {
  if (!editor) return;
  const currentImages: string[] = [];
  editor.state.doc.descendants((node) => {
    if (node.type.name === 'image' || node.type.name === 'imageUpload') {
      if (node.attrs.src) {
        currentImages.push(node.attrs.src);
      }
    }
  });

  const deletedEditorImages = uploadedEditorImages.filter(
    (image) => !currentImages.includes(image.url)
  );

  if (deletedEditorImages.length > 0) {
    console.log('Deleting images:', deletedEditorImages);

    await Promise.all(
      deletedEditorImages.map((image) =>
        axiosInstance.delete(`/editor-images/`, {
          data: { publicId: image.public_id },
        })
      )
    );

    console.log('Successfully deleted all removed images');
  }
}
