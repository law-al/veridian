import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href='/'>
      <Image
        src='/logo.png'
        alt='Blog Logo'
        width={100}
        height={50}
        className='w-40'
      />
    </Link>
  );
}
