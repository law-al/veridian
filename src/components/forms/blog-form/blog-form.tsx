'use client';
import React, { startTransition, useActionState, useEffect } from 'react';
import BlogCoverUpload from './blog-cover-upload';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { formSchema } from '@/declaration';
import BlogContentEditor from './blog-editor/blog-content-editor';
import BlogMetaField from './blog-meta-field';
import cleanupRemovedEditorImages from '@/lib/cleanup-removed-editor-images';
import { useCreateBlogContext } from '@/contexts/create-blog-context';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import BlogFormActions from './blog-form-actions';
import { ActionState, addPostToDB } from '@/lib/actions/blog';

export default function BlogForm() {
  const initialState: ActionState = { success: false, message: '' };
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    addPostToDB,
    initialState
  );
  const router = useRouter();
  const {
    form,
    file,
    tags,
    editor,
    handleSubmitting,
    handleSetFile,
    handleSetTags,
    handleFormReset,
    handleEditorReset,
    uploadedEditorImages,
    handleCoverImgUploadStatus,
  } = useCreateBlogContext();

  useEffect(() => {
    if (state?.success) {
      toast.success('Blog post created', {
        description: state.message,
      });

      handleSetFile(null);
      handleSetTags(null, 'reset');
      handleFormReset();
      handleEditorReset();

      router.push('/blog');
    } else if (state && !state.success) {
      toast.error('Error creating blog post', {
        description: state.error || state.message,
      });
    }
  }, [state]);

  useEffect(() => {
    handleSubmitting(pending);
  }, [pending]);

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

    startTransition(() => {
      formAction(formData);
    });

    await cleanupRemovedEditorImages({ editor, uploadedEditorImages });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <BlogCoverUpload />

          <BlogMetaField />

          <BlogContentEditor />

          <BlogFormActions />

          {form.formState.errors.root && (
            <p className='text-red-500 text-sm'>
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      </Form>
    </>
  );
}
