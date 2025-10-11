import axios from 'axios';
import axiosInstance from './axios-instance';
import { MAX_FILE_SIZE } from './tiptap-utils';

interface UploadResponse {
  public_id: string;
  url: string;
}

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

  console.log('entered');
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
