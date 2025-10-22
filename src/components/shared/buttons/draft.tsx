import React from 'react';
import { Button } from '@/components/ui/button';

export default function SaveAsDraftButton() {
  return (
    <Button
      variant='outline'
      type='button'
      className='w-[180px] h-12 cursor-pointer hover:scale-102 !transition-all !duration-700 ease-out'
    >
      Save as drafts
    </Button>
  );
}
