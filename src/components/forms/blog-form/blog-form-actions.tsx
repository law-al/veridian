import SaveAsDraftButton from '@/components/shared/buttons/draft';
import SubmitButton from '@/components/shared/buttons/submit';
import { useCreateBlogContext } from '@/contexts/create-blog-context';
import React from 'react';

export default function BlogFormActions() {
  const { submitting } = useCreateBlogContext();
  return (
    <div className='flex items-center justify-end gap-5'>
      <SaveAsDraftButton />

      <SubmitButton submitting={submitting} text='Publish' />
    </div>
  );
}
