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
import { DialogDemo } from '@/components/dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/tiptap-utils';

export default function BlogForm() {
  const router = useRouter();
  const {
    form,
    file,
    tags,
    editor,
    submitting,
    handleSubmitting,
    handleSetFile,
    handleSetTags,
    handleFormReset,
    handleEditorReset,
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
    formData.append('markdownJSON', editor?.getHTML() as string);

    await cleanupRemovedEditorImages({ editor, uploadedEditorImages });

    try {
      handleSubmitting(true);
      console.log(editor?.getHTML());
      const res = await axiosInstance.post('/blog', formData);

      if (res.status === 201) {
        router.push('/blog');
        toast('Blog post created', {
          description:
            'Blog post has been successfully created, redirecting to blog post...',
          style: {
            background: '#1f2937',
            color: '#f9fafb',
            border: '1px solid #374151',
            borderRadius: '10px',
            padding: '14px 18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '0.95rem',
          },
          duration: 3000,
        });

        handleSetFile(null);
        handleSetTags(null, 'reset');
        handleFormReset();
        handleEditorReset();
      }
    } catch (error) {
      if (error) {
        form.setError('root', {
          type: 'manual',
          message: 'Sorry, Something went wrong',
        });

        toast('Error creating blog post', {
          description:
            'Something went wrong while creating your blog post. Please try again.',
          style: {
            background: '#7f1d1d',
            color: '#fee2e2',
            border: '1px solid #b91c1c',
            borderRadius: '10px',
            padding: '14px 18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontSize: '0.95rem',
          },
          duration: 4000,
        });
      }
    } finally {
      handleSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
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

          {form.formState.errors.root && (
            <p className='text-red-500 text-sm'>
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      </Form>

      <DialogDemo />
    </>
  );
}
