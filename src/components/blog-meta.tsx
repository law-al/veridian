import Image from 'next/image';
import React from 'react';
import { playfair } from '@/lib/fonts';

export default function BlogMeta({
  title,
  image,
  excerpt,
}: {
  title: string;
  image: string;
  excerpt: string;
}) {
  return (
    <div className=''>
      <div className='space-y-3'>
        <h1
          className={`${playfair.className} font-semibold text-5xl capitalize`}
        >
          {title}
        </h1>
        <p className='font-light'>{excerpt}</p>
      </div>

      <Image
        src={image}
        alt='Blog Image'
        width={1000}
        height={1000}
        className='w-full h-[600px] object-cover mt-3'
      />
    </div>
  );
}
