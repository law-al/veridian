import React from 'react';
import FormInputField from '../shared/form-input-field';
import FormTextareaField from '../shared/form-textarea-field';
import { UseFormReturn } from 'react-hook-form';
import { formSchema } from '@/declaration';
import { z } from 'zod';
import { FormSelectField } from '../shared/form-select-field';
import TagField from '../../tag-input-field';
import { useCreateBlogContext } from '@/contexts/create-blog-context';

const BlogCategory = [
  {
    label: 'Category',
    data: [
      {
        value: 'lifestyle',
        item: 'Lifestyle',
      },
      {
        value: 'tech',
        item: 'Tech',
      },
      {
        value: 'finance',
        item: 'Finance',
      },
      {
        value: 'health & fitness',
        item: 'Health & Fitness',
      },
      {
        value: 'travel',
        item: 'Travel',
      },
      {
        value: 'food',
        item: 'Food',
      },
      {
        value: 'parenting',
        item: 'Parenting',
      },
      {
        value: 'education',
        item: 'Education',
      },
      {
        value: 'fashion & beauty',
        item: 'Fashion & Beauty',
      },
      {
        value: 'creative writing',
        item: 'Creative Writing',
      },
    ],
  },
];

export default function BlogMetaForm({}) {
  const { form, submitting } = useCreateBlogContext();

  return (
    <div className='bg-purple-50/50 p-6 space-y-8'>
      <FormInputField
        form={form}
        name='title'
        label='Blog Title'
        placeholder='Enter blog title'
        submitting={submitting}
      />

      <FormTextareaField
        form={form}
        name='shortDescription'
        label='Short description'
        placeholder='Enter a short description (max: 200)'
        submitting={submitting}
      />

      <FormSelectField
        form={form}
        name='category'
        label='Blog Category'
        placeholder='Select a Category'
        items={BlogCategory}
        submitting={submitting}
      />

      <TagField submitting={submitting} />
    </div>
  );
}
