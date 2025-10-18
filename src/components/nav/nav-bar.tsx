import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavLink from './nav-link';
import { Button } from '../ui/button';
import Search from '../search/search';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PenSquareIcon } from 'lucide-react';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignInButton, UserButton } from '@clerk/nextjs';
import SignUpButton from '../buttons/sign-up';
import SubscribeButton from '../buttons/subscribe';

const navLinks = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/articles',
    name: 'Article',
  },
];

export default async function NavBar() {
  const { isAuthenticated } = await auth();
  const user = await currentUser();
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

        {isAuthenticated ? (
          <div className='flex gap-2 items-center h-[50px]'>
            <Link
              href='/articles/write'
              className='flex items-center gap-1 w-[80px] mr-6'
            >
              <PenSquareIcon className='size-7' />
              <p className='text-lg'>Write</p>
            </Link>

            <Search />
            <SubscribeButton />

            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'size-13',
                  avatarImage: 'size-13',
                  avatarFallback: 'size-13',
                  userButtonPopoverCard: 'w-[300px]',
                  userButtonPopoverCardHeader:
                    'flex items-center justify-between',
                  userButtonPopoverCardHeaderTitle: 'text-lg font-semibold',
                  userButtonPopoverCardHeaderDescription:
                    'text-sm text-gray-500',
                  userButtonPopoverCardContent:
                    'flex items-center justify-between',
                },
              }}
            />
          </div>
        ) : (
          <div className='flex gap-2 items-center h-[50px]'>
            <SignInButton />
            <SignUpButton />
          </div>
        )}
      </div>
    </nav>
  );
}
