'use client';
import React, { useContext, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { formSchema } from '@/declaration';
import useBlogEditor from '@/hooks/use-blog-editor';
import { createContext } from 'react';
import { Editor } from '@tiptap/core';

type UploadStatus = 'error' | 'loading' | 'idle' | 'starting';

interface UploadedEditorImages {
  public_id: string;
  url: string;
}

interface CreateBlogContextType {
  file: File | null;
  tags: Set<string>;
  coverImgUploadStatus: UploadStatus;
  editor: Editor | null;
  uploadedEditorImages: UploadedEditorImages[];
  submitting: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleSetFile: (val: File | null) => void;
  handleSetTags: (
    val: string | null,
    action: 'add' | 'delete' | 'reset'
  ) => void;
  handleCoverImgUploadStatus: (val: UploadStatus) => void;
  handleFormReset: () => void;
  handleEditorReset: () => void;
  handleSubmitting: (val: boolean) => void;
}

const CreateBlogContext = createContext<CreateBlogContextType | undefined>(
  undefined
);

export function CreateBlogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coverImgUploadStatus, setCoverImgUploadStatus] =
    useState<UploadStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const { editor, uploadedEditorImages } = useBlogEditor({
    editable: !submitting,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      category: '',
    },
  });

  const handleSetFile = (val: File | null) => {
    setFile(val);
  };

  const handleSetTags = (
    val: string | null,
    action: 'add' | 'delete' | 'reset'
  ) => {
    setTags((prev) => {
      if (!val || action === 'reset') {
        return new Set();
      } else if (action === 'add') {
        const newSet = new Set(prev);
        newSet.add(val);
        return newSet;
      } else if (action === 'delete') {
        const newSet = new Set(prev);
        newSet.delete(val);
        return newSet;
      }
      return prev;
    });
  };

  const handleCoverImgUploadStatus = (val: UploadStatus) => {
    setCoverImgUploadStatus(val);
  };

  const handleFormReset = () => {
    form.reset();
  };

  const handleEditorReset = () => {
    editor?.commands.clearContent();
  };

  const handleSubmitting = (val: boolean) => {
    setSubmitting(val);
  };

  return (
    <CreateBlogContext.Provider
      value={{
        file,
        tags,
        form,
        coverImgUploadStatus,
        submitting,
        handleCoverImgUploadStatus,
        editor,
        uploadedEditorImages,
        handleSetFile,
        handleSetTags,
        handleEditorReset,
        handleFormReset,
        handleSubmitting,
      }}
    >
      {children}
    </CreateBlogContext.Provider>
  );
}

export const useCreateBlogContext = () => {
  const context = useContext(CreateBlogContext);
  if (!context) {
    throw new Error(
      'useCreateBlogContext must be used within a CreateBlogProvider'
    );
  }
  return context;
};
