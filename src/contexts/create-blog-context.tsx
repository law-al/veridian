'use client';
import React, { useContext, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { formSchema } from '@/declaration';
import useBlogEditor from '@/hooks/use-editor';
import cleanupRemovedEditorImages from '@/lib/cleanup-removed-editor-images';
import axiosInstance from '@/lib/axios-instance';

import { createContext } from 'react';
import { Editor } from '@tiptap/core';

export type UploadStatus = 'error' | 'loading' | 'idle' | 'starting';

interface UploadedEditorImages {
  public_id: string;
  url: string;
}

interface CreateBlogContextType {
  file: File | null;
  tags: Set<string>;
  coverImgUploadStatus: UploadStatus;
  handleSetFile: (val: File) => void;
  handleSetTags: (val: string, action: 'add' | 'delete') => void;
  handleCoverImgUploadStatus: (val: UploadStatus) => void;
  editor: Editor | null;
  uploadedEditorImages: UploadedEditorImages[];
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const CreateBlogContext = createContext<CreateBlogContextType | undefined>(
  undefined
);

export function CreateBlogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { editor, uploadedEditorImages } = useBlogEditor({});
  const [coverImgUploadStatus, setCoverImgUploadStatus] =
    useState<UploadStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<Set<string>>(new Set());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      category: '',
    },
  });

  const handleSetFile = (val: File) => {
    setFile(val);
  };

  const handleSetTags = (val: string, action: 'add' | 'delete') => {
    setTags((prev) => {
      if (action === 'add') {
        const newSet = new Set(prev);
        newSet.add(val);
        return newSet;
      } else {
        const newSet = new Set(prev);
        newSet.delete(val);
        return newSet;
      }
    });
  };

  const handleCoverImgUploadStatus = (val: UploadStatus) => {
    setCoverImgUploadStatus(val);
  };

  return (
    <CreateBlogContext.Provider
      value={{
        file,
        tags,
        form,
        coverImgUploadStatus,
        handleSetFile,
        handleSetTags,
        handleCoverImgUploadStatus,
        editor,
        uploadedEditorImages,
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
