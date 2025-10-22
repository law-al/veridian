import Link from 'next/link';
import React from 'react';
import NavLink from '@/components/layout/header/nav-link';
import Search from '../../search/search';
import { PenSquareIcon } from 'lucide-react';
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignInButton, UserButton } from '@clerk/nextjs';
import SignUpButton from '../../shared/buttons/sign-up';
import SubscribeButton from '../../shared/buttons/subscribe';
import Logo from '../logo';
import { getUser } from '@/lib/data';

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

type UserPublicMetadata = {
  subscribed?: boolean;
  role?: string;
  subscription?: string;
};

export default async function NavBar() {
  const { userId } = await auth();
  const user = await getUser();
  console.log('user id=====', userId);

  return (
    <nav className='w-full'>
      <div className='py-2 h-20 flex items-center justify-between'>
        <div className='flex items-center gap-10'>
          <Logo />
          <div className='flex items-center gap-3'>
            {navLinks.map((navLink) => (
              <NavLink
                key={navLink.name}
                navName={navLink.name}
                href={navLink.href}
                className='font-semibold'
              />
            ))}
          </div>
        </div>

        {user?.clerkId ? (
          <div className='flex gap-2 items-center h-[50px]'>
            {user?.role === 'WRITER' && (
              <Link
                href='/articles/write'
                className='flex items-center gap-1 w-[80px] mr-6'
              >
                <PenSquareIcon className='size-7' />
                <p className='text-lg'>Write</p>
              </Link>
            )}
            <Search />

            {/* Show subscribe button if NOT subscribed */}
            {!user?.subscribed && <SubscribeButton />}

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
