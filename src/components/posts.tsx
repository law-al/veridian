import React from 'react';
import BlogCard from './blog-card';

export default function Posts() {
  return (
    <section id='posts' className='mt-10 scroll scroll-smooth'>
      <div className='space-y-8'>
        <div className='grid grid-cols-4 gap-10 justify-between'>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>
  );
}
