import React from 'react';
import FormInputField from './form-input-field';
import FormTextareaField from './form-textarea-field';
import { UseFormReturn } from 'react-hook-form';
import { formSchema } from '@/declaration';
import { z } from 'zod';

export default function BlogMetaForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
  return (
    <div className='bg-purple-50/50 p-6 space-y-8'>
      <FormInputField
        form={form}
        name='title'
        label='Blog Title'
        placeholder='Enter blog title'
      />
      <FormTextareaField
        form={form}
        name='shortDescription'
        label='Short description'
        placeholder='Enter a short description (max: 200)'
      />
    </div>
  );
}
