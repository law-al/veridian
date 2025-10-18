import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function SignUpButton() {
  return (
    <Button
      asChild
      size='lg'
      className='!h-full !bg-blue-main !text-white cursor-pointer hover:!bg-blue-main/80 hover:!text-white !transition-all duration-300'
    >
      <Link href='/sign-up'>Sign Up</Link>
    </Button>
  );
}
