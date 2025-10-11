'use client';
import React, { useState } from 'react';
import UploadCoverImage from './upload-cover-image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { formSchema } from '@/declaration';
import MarkdownEditor from '../editor/editor';
import { EditorContext } from '@tiptap/react';
import useBlogEditor from '@/hooks/use-editor';
import BlogMetaForm from './blog-meta-form';
import cleanupRemovedEditorImages from '@/lib/cleanup-removed-editor-images';

export default function BlogForm() {
  const { editor, uploadedEditorImages } = useBlogEditor({});

  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(file);
    console.log(values);
    console.log(editor?.getJSON());

    await cleanupRemovedEditorImages({ editor, uploadedEditorImages });
  };

  const handleSetFile = (val: File) => {
    setFile(val);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <EditorContext.Provider value={{ editor }}>
          <UploadCoverImage onHandleSetFile={handleSetFile} />

          <BlogMetaForm form={form} />

          <MarkdownEditor editor={editor} />

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
        </EditorContext.Provider>
      </form>
    </Form>
  );
}
