import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavLink from './nav-link';
import SearchBar from '../search/search-bar';
import NavProvider from '@/contexts/nav-context';
import SearchButton from '../search/search-button';
import AppButton from '../app-button';
import { Button } from '../ui/button';

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
      <div className='mx-20 px-4 pr-8 py-2 h-20 flex items-center justify-between'>
        <Link href='/'>
          <Image src='/logo-1.png' alt='Blog Logo' width={250} height={250} />
        </Link>

        <NavProvider>
          {/* <SearchBar /> */}

          <div className='flex items-center gap-6'>
            <div className='space-x-6'>
              {navLinks.map((nav) => (
                <NavLink key={nav.name} href={nav.href} navName={nav.name} />
              ))}
            </div>
            {/* <SearchButton /> */}

            <Button
              asChild
              className={`cursor-pointer rounded-xs text-base !px-6 py-6 transition-all 200ms text-white bg-purple-600 hover:bg-purple-500 border border-transparent`}
            >
              <Link href='/blog/add'>Add Blog</Link>
            </Button>
          </div>
        </NavProvider>
      </div>
    </nav>
  );
}
