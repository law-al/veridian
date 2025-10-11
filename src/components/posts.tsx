import React from 'react';
import AppButton from './app-button';
import BlogCard from './blog-card';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Posts() {
  return (
    <div className='w-full my-15'>
      <div className='container mx-auto'>
        <div className='flex items-center mb-6'>
          <h2 className='font-semibold text-4xl'>Popular Posts</h2>
          <Button
            asChild
            className={`ml-auto cursor-pointer rounded-xs text-base !px-6 py-6 transition-all 200ms text-white bg-purple-600 hover:bg-purple-500 border border-transparent`}
          >
            <Link href='/blog/add'>View All</Link>
          </Button>
        </div>
        <div className='grid grid-cols-3 gap-5'>
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
}
