import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Editor } from '@tiptap/core';
import axiosInstance from './axios-instance';
import sanitizeHtml from 'sanitize-html';
import axios from 'axios';
import { MAX_FILE_SIZE } from './tiptap-utils';

interface UploadedEditorImages {
  public_id: string;
  url: string;
}

interface UploadResponse {
  public_id: string;
  url: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * The function `cleanupRemovedEditorImages` deletes editor images that are no longer present in the
 * editor's content.
 * @param  - The `cleanupRemovedEditorImages` function takes two parameters:
 * @returns The function `cleanupRemovedEditorImages` is being exported as the default export.
 */
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
    await Promise.all(
      deletedEditorImages.map((image) =>
        axiosInstance.delete(`/editor-images/`, {
          data: { publicId: image.public_id },
        })
      )
    );
  }
}

/**
 * The `purifyHtml` function in TypeScript sanitizes HTML content by allowing only specific tags,
 * attributes, and styles to prevent XSS attacks.
 * @param {string} html - The `purifyHtml` function takes an HTML string as input and sanitizes it by
 * allowing only specific HTML tags, attributes, and styles using the `sanitizeHtml` library.
 * @returns The `purifyHtml` function returns a sanitized version of the input HTML string, with only
 * the specified allowed tags, attributes, and styles. The sanitized HTML string is generated using the
 * `sanitizeHtml` function with the provided configuration options.
 */
export const purifyHtml = (html: string): string => {
  const sanitized = sanitizeHtml(html, {
    allowedTags: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'code',
      'pre',

      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',

      'ul',
      'ol',
      'li',

      'blockquote',

      'img',

      'a',

      'hr',
      'div',
      'span',
    ],
    allowedAttributes: {
      '*': ['class', 'style'], // For text-align and other styling
      img: ['src', 'alt', 'title'],
      a: ['href', 'target', 'rel'],
    },
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
  });
  return sanitized;
};

export const handleImageUpload = async (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal
): Promise<UploadResponse> => {
  const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  // Validate file
  if (!file) {
    throw new Error('No file provided');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
    );
  }

  console.log(file);

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`File type not accepted`);
  }

  const formData = new FormData();

  formData.append('file', file);
  try {
    const res = await axiosInstance.post('/editor-images', formData, {
      signal: abortSignal,
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        if (total) {
          const progress = Math.floor((loaded * 100) / total);
          onProgress?.({ progress });
        }
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.status === 201 && res.data?.url) {
      return res.data;
    } else {
      throw new Error('Upload succeeded but no URL returned');
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Upload cancelled');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Upload failed: ' + String(error));
  }
};

/**
 * Generates a random alphanumeric string of a specified length.
 *
 * @param {number} length The desired length of the random string.
 * @param {string} [characters] Optional: A string of characters to use for generation.
 * Defaults to alphanumeric (a-z, A-Z, 0-9).
 * @returns {string} The randomly generated string.
 */
export function generateRandomString(length: number, characters?: string) {
  const defaultChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const chars = characters || defaultChars;

  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return `${result}_${Date.now().toString(36)}`;
}
