import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavLink from './nav-link';
import AppButton from '../app-button';
import { Button } from '../ui/button';
import Search from '../search/search';

const navLinks = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/blog',
    name: 'Blog',
  },
];

export default function NavBar() {
  return (
    <nav className='w-full'>
      <div className='py-2 h-20 flex items-center justify-between'>
        <div className='flex items-center gap-10'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='Blog Logo'
              width={100}
              height={50}
              className='w-40'
            />
          </Link>

          <div className='flex items-center gap-3'>
            {navLinks.map((navLink) => {
              return (
                <NavLink
                  key={navLink.name}
                  navName={navLink.name}
                  href={navLink.href}
                  className='font-semibold'
                />
              );
            })}
          </div>
        </div>

        <div className='flex gap-2 items-center h-[50px]'>
          <Search />
          <Button
            size='lg'
            className='!h-full !bg-blue-main cursor-pointer hover:bg-[#93C5FD] !transition-all duration-300'
          >
            Subscribe
          </Button>
        </div>
      </div>
    </nav>
  );
}
