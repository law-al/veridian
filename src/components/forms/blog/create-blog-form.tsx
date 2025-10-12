'use client';
import React from 'react';
import UploadCoverImage from '../../upload-cover-image';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { formSchema } from '@/declaration';
import MarkdownEditor from '../../markdown/markdown-editor';
import BlogMetaForm from './blog-meta-form';
import cleanupRemovedEditorImages from '@/lib/cleanup-removed-editor-images';
import axiosInstance from '@/lib/axios-instance';
import { useCreateBlogContext } from '@/contexts/create-blog-context';

export default function BlogForm() {
  const {
    form,
    file,
    tags,
    editor,
    uploadedEditorImages,
    handleCoverImgUploadStatus,
  } = useCreateBlogContext();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      handleCoverImgUploadStatus('error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', values.title);
    formData.append('desc', values.shortDescription);
    formData.append('category', values.category);
    formData.append('tags', JSON.stringify([...tags]));
    formData.append('markdownJSON', JSON.stringify(editor?.getJSON()));

    await cleanupRemovedEditorImages({ editor, uploadedEditorImages });

    try {
      const res = await axiosInstance.post('/blog', formData);
      console.log(res.data);
    } catch (error) {
      if (error) {
        form.setError('root', {
          type: 'manual',
          message: 'Sorry, Something went wrong',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <UploadCoverImage />

        <BlogMetaForm />

        <MarkdownEditor />

        <div className='flex gap-5'>
          <Button
            variant='outline'
            type='button'
            className='w-[180px] h-12 cursor-pointer hover:scale-102 !transition-all !duration-700 ease-out ml-auto'
          >
            Save as drafts
          </Button>
          <Button
            type='submit'
            className='w-[180px] h-12 cursor-pointer bg-purple-600 hover:bg-purple-500 hover:scale-102 !transition-all !duration-700 ease-out'
          >
            Submit
          </Button>
        </div>

        {form.formState.errors.root && (
          <p className='text-red-500 text-sm'>
            {form.formState.errors.root.message}
          </p>
        )}
      </form>
    </Form>
  );
}
