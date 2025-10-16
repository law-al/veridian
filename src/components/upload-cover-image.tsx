import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';
import { TiTimes } from 'react-icons/ti';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import UploadedImagePreview from './uploaded-image-preview';
import { cn } from '@/lib/utils';
import { useCreateBlogContext } from '@/contexts/create-blog-context';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const ACCEPTED_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_SIZE_MB = 10;

export type UploadStatus = 'error' | 'loading' | 'idle' | 'starting';

interface UploadError {
  message: string;
  type: 'size' | 'format' | 'upload';
}

export default function UploadCoverImage({
  submitting = false,
}: {
  submitting?: boolean;
}) {
  const { coverImgUploadStatus, handleCoverImgUploadStatus, handleSetFile } =
    useCreateBlogContext();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<UploadError | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): UploadError | null => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return {
        message: 'Invalid file format. Please upload PNG, JPG, or WEBP.',
        type: 'format',
      };
    }

    if (file.size > ACCEPTED_SIZE) {
      return {
        message: `File size exceeds ${MAX_SIZE_MB}MB. Please choose a smaller file.`,
        type: 'size',
      };
    }

    return null;
  };

  const processFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        handleCoverImgUploadStatus('error');
        return;
      }

      handleCoverImgUploadStatus('loading');
      setError(null);
      setUploadProgress(0);

      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentage);
        }
      };

      reader.onload = (event) => {
        const result = event.target?.result as string;

        if (result) {
          handleSetFile(file);
          setCoverImage(result);
          handleCoverImgUploadStatus('idle');
          setUploadProgress(100);

          // Reset input value
          if (imageInputRef.current) {
            imageInputRef.current.value = '';
          }
        }
      };

      reader.onerror = () => {
        setError({
          message: 'Failed to read file. Please try again.',
          type: 'upload',
        });
        handleCoverImgUploadStatus('error');
        setUploadProgress(0);
      };

      reader.readAsDataURL(file);
    },
    [handleSetFile]
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setUploadProgress(0);
    setError(null);
    handleCoverImgUploadStatus('idle');
  };

  const handleUploadClick = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className='bg-blue-sec/5 p-6 rounded-lg'>
      <h4
        className={cn(
          'font-semibold mb-5 text-lg',
          coverImgUploadStatus === 'error' && 'text-red-500'
        )}
      >
        Cover Image <span className='text-red-500'>*</span>
      </h4>

      <div
        className={cn(
          'border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out overflow-hidden bg-white',
          !coverImage && 'hover:border-blue-main hover:bg-blue-500/5',
          coverImgUploadStatus === 'loading' &&
            'border-green-500 bg-green-50/30',
          coverImgUploadStatus === 'error' && 'border-red-500 bg-red-50/30',
          isDragging && 'border-blue-500 bg-blue-500/50 scale-[1.02]',
          coverImgUploadStatus === 'idle' && !coverImage && 'border-gray-300'
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {coverImage ? (
          <UploadedImagePreview
            coverImage={coverImage}
            onRemoveImage={handleRemoveImage}
          />
        ) : (
          <>
            <input
              type='file'
              name='upload'
              id='image'
              accept={ACCEPTED_IMAGE_TYPES.join(',')}
              className='hidden'
              ref={imageInputRef}
              onChange={handleImageUpload}
              disabled={coverImgUploadStatus === 'loading' || submitting}
            />

            <div
              className={cn(
                'p-10 cursor-pointer flex flex-col items-center justify-center gap-3',
                coverImgUploadStatus === 'loading' &&
                  'cursor-not-allowed opacity-60'
              )}
              onClick={
                coverImgUploadStatus !== 'loading'
                  ? handleUploadClick
                  : undefined
              }
            >
              <div
                className={cn(
                  'p-4 rounded-full transition-colors',
                  isDragging ? 'bg-blue-500/20' : 'bg-blue-500/10'
                )}
              >
                <Upload
                  className={cn(
                    'w-8 h-8 transition-colors',
                    isDragging ? 'text-blue-600' : 'text-blue-500'
                  )}
                />
              </div>

              <div className='text-center'>
                <p className='text-sm mb-1'>
                  <span className='text-blue-600 font-semibold'>
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className='text-xs text-gray-500'>
                  PNG, JPG, WEBP up to {MAX_SIZE_MB}MB
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Status Messages */}
      {coverImgUploadStatus === 'loading' && (
        <div className='mt-4 space-y-2'>
          <div className='flex items-center gap-2 text-sm text-green-700'>
            <CheckCircle2 className='w-4 h-4 animate-pulse' />
            <span>Uploading... {uploadProgress}%</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
            <div
              className='bg-green-500 h-full transition-all duration-300 ease-out'
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {coverImgUploadStatus === 'error' && error && (
        <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2'>
          <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
          <div className='flex-1'>
            <p className='text-sm font-medium text-red-800'>Upload Failed</p>
            <p className='text-xs text-red-600 mt-1'>{error.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
