import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

export default function SubmitButton({
  submitting,
  text = 'Submit',
}: {
  submitting: boolean;
  text?: string;
}) {
  return (
    <Button
      disabled={submitting}
      type='submit'
      className={cn(
        'w-[180px] h-12 cursor-pointer bg-blue-main hover:bg-blue-main/80 hover:scale-102 !transition-all !duration-700 ease-out',
        submitting && 'cursor-not-allowed'
      )}
    >
      {submitting && <Spinner className='' />}
      {submitting ? 'Submitting...' : text}
    </Button>
  );
}
