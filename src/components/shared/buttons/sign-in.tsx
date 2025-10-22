import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignInButton() {
  return (
    <Button
      asChild
      size='lg'
      className='!h-full !bg-transparent !border-2 !border-blue-main !text-blue-main cursor-pointer hover:!bg-blue-main hover:!text-white !transition-all duration-300'
    >
      <Link href='/sign-in'>Sign In</Link>
    </Button>
  );
}
