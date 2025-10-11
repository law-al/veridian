import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export default function AppButton({
  type,
  text = 'Contact Us',
  className,
}: {
  type: 'outline' | 'main';
  text?: string;
  className?: string;
}) {
  return (
    <Button
      className={cn(
        `cursor-pointer rounded-xs text-base !px-6 py-6 transition-all 200ms`,
        className,
        type === 'main' &&
          'text-white bg-purple-600 hover:bg-purple-500 border border-transparent',
        type === 'outline' &&
          'text-purple-600 bg-transparent hover:bg-purple-500 hover:text-white hover:border-transparent border border-purple-600'
      )}
    >
      {text}
    </Button>
  );
}
