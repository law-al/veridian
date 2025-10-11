import BlogForm from '@/components/forms/create-blog-form';
import { poppins } from '@/components/fonts';
import React from 'react';

export default function Page() {
  return (
    <section className='w-full'>
      <div className='container mx-auto py-6'>
        <div className='mb-10'>
          <h2 className={`text-4xl font-bold mb-3 ${poppins.className}`}>
            Add New Blog Post
          </h2>
          <span>Fill out the form below to create your new blog post</span>
        </div>

        <BlogForm />
      </div>
    </section>
  );
}
