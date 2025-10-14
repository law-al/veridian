import React from 'react';
import BlogCard from './blog-card';
import { Button } from './ui/button';
import Link from 'next/link';
import SearchBar from './search/search-bar';

export default function Posts() {
  return (
    <section id='posts' className='w-full py-5 scroll'>
      <div className='mx-20 space-y-8'>
        <SearchBar />

        <div className='grid grid-cols-3 gap-10 justify-between'>
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
