import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useCreateBlogContext } from '@/contexts/create-blog-context';
import { cn } from '@/lib/utils';
import React from 'react';

export default function BlogFormActions() {
  const { submitting } = useCreateBlogContext();
  return (
    <div className='flex gap-5'>
      <Button
        variant='outline'
        type='button'
        className='w-[180px] h-12 cursor-pointer hover:scale-102 !transition-all !duration-700 ease-out ml-auto'
      >
        Save as drafts
      </Button>

      <Button
        disabled={submitting}
        type='submit'
        className={cn(
          'w-[180px] h-12 cursor-pointer bg-blue-main hover:bg-blue-main/80 hover:scale-102 !transition-all !duration-700 ease-out',
          submitting && 'cursor-not-allowed'
        )}
      >
        {submitting && <Spinner className='' />}
        {submitting ? 'Submitting...' : 'Submit'}
      </Button>
    </div>
  );
}
