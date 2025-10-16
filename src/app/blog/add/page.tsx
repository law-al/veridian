import BlogForm from '@/components/forms/blog-form/blog-form';
import { poppins } from '@/lib/fonts';
import React from 'react';
import { CreateBlogProvider } from '@/contexts/create-blog-context';

export default function Page() {
  return (
    <section className='w-full mt-10'>
      <div className='mb-10'>
        <h2 className={`text-4xl font-bold mb-3 ${poppins.className}`}>
          Add New Blog Post
        </h2>
        <span>Fill out the form below to create your new blog post</span>
      </div>

      <CreateBlogProvider>
        <BlogForm />
      </CreateBlogProvider>
    </section>
  );
}
