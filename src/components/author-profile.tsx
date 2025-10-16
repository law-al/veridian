import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

export default function AuthorProfile() {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className='size-10'>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className=''>
        <p className='font-semibold text-sm'>John Doe</p>
        <span className='font-light text-sm'>
          Published on the 15th of Oct. 2025. 7 mins read
        </span>
      </div>
    </div>
  );
}
