import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { TiTimes } from 'react-icons/ti';
import UploadedImagePreview from './uploaded-image-preview';
import { cn } from '@/lib/utils';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const ACCEPTED_SIZE = 10 * 1024 * 1024;

export default function UploadCoverImage({
  onHandleSetFile,
}: {
  onHandleSetFile: (val: File) => void;
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'error' | 'loading' | 'idle' | 'starting'
  >('idle');
  const [coverImage, setCoverImage] = useState<null | string>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadStatus('starting');

    if (!e.target.files) return;
    const files = e.target.files;
    const fileSizeIsAccepted = files[0].size <= ACCEPTED_SIZE;
    const fileTypeIsAccepted = ACCEPTED_IMAGE_TYPES.includes(files[0].type);

    if (files[0] && fileSizeIsAccepted && fileTypeIsAccepted) {
      setUploadStatus('loading');
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (!event) return;
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          console.log(percentage);
        }
        const result = event.target && (event.target.result as string);
        onHandleSetFile(file);
        setCoverImage(result);

        if (imageInputRef.current) {
          imageInputRef.current.value = '';
        }
        setUploadStatus('idle');
      };

      reader.onerror = () => {
        setUploadStatus('error');
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
  };

  return (
    <div className='bg-purple-50/50 p-6'>
      <h4 className='font-semibold mb-5'>Cover Image (required)</h4>

      <div
        className={cn(
          'border-2 border-dashed border-gray-300 rounded-md hover:border-purple-500 !transition-all !duration-300 ease-in',
          uploadStatus === 'loading' && 'border-green-600',
          uploadStatus === 'error' && 'border-red-600'
        )}
      >
        {coverImage ? (
          <UploadedImagePreview
            coverImage={coverImage}
            onRemoveImage={handleRemoveImage}
          />
        ) : (
          <div className=''>
            <input
              type='file'
              name='upload'
              id='image'
              accept='image/*'
              className='hidden'
              ref={imageInputRef}
              onChange={handleImageUpload}
            />
            <div
              className='p-10 cursor-pointer flex flex-col items-center justify-center'
              onClick={() => {
                if (!imageInputRef.current) return;
                imageInputRef.current.click();
              }}
            >
              <p className='text-sm'>
                <span className='text-blue-700 font-semibold'>
                  Upload a file{' '}
                </span>
                or drag and drop
              </p>
              <p className='text-xs font-extralight'>PNG, JPG, GIF upto 10mb</p>
            </div>
          </div>
        )}
      </div>

      {uploadStatus === 'loading' ? (
        <div>loading</div>
      ) : uploadStatus === 'error' ? (
        <div>Error</div>
      ) : (
        ''
      )}
    </div>
  );
}
