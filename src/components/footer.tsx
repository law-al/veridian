import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='w-full'>
      <div className='container mx-auto py-4 flex flex-col items-center justify-center'>
        <Link href='/'>
          <Image src='/logo-1.png' alt='Brand Logo' width={250} height={250} />
        </Link>
      </div>
    </footer>
  );
}
