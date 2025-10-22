import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  TiSocialFacebook,
  TiSocialFacebookCircular,
  TiSocialInstagram,
  TiSocialInstagramCircular,
  TiSocialTwitter,
  TiSocialTwitterCircular,
} from 'react-icons/ti';

export default function Footer() {
  return (
    <footer className='my-10'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <Image src='/logo.png' alt='Brand Logo' width={150} height={50} />
        </Link>

        <p className='text-gray-500 font-semibold'>
          &copy; 2024 Insight. All rights reserved
        </p>

        <ul className='flex items-center gap-3'>
          <li>
            <Link href='/' className=''>
              <TiSocialFacebookCircular className='size-7' />
            </Link>
          </li>
          <li>
            <Link href='/' className=''>
              <TiSocialInstagramCircular className='size-7' />
            </Link>
          </li>
          <li>
            <Link href='/' className=''>
              <TiSocialTwitterCircular className='size-7' />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
