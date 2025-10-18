import React from 'react';
import { Button } from '../ui/button';

export default function SubscribeButton() {
  return (
    <Button
      size='lg'
      className='!h-full !bg-blue-main cursor-pointer hover:bg-[#93C5FD] !transition-all duration-300'
    >
      Subscribe
    </Button>
  );
}
