import Image from 'next/image';
import React from 'react';
import { TiTimes } from 'react-icons/ti';

export default function UploadedImagePreview({
  coverImage,
  onRemoveImage,
}: {
  coverImage: string;
  onRemoveImage: () => void;
}) {
  return (
    <div className='relative w-[300px] group transition-all duration-300 ease-in-out'>
      <Image
        src={coverImage}
        alt='Uploaded Cover Image'
        width={200}
        height={300}
        className='w-[300px] h-[300px] object-cover rounded-md'
      />

      <div className='absolute top-2 right-2 w-[30px] h-[30px] border border-white flex items-center justify-center rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in'>
        <TiTimes
          size={25}
          className='text-white'
          onClick={() => onRemoveImage()}
        />
      </div>
    </div>
  );
}
