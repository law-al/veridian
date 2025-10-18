import { PaginationWithLinks } from '@/components/pagination-with-links';
import Articles from '@/components/articles';
import BlogMode from '@/components/blog-mode';
import Filters from '@/components/filters';
import BlogModeProvider from '@/contexts/blog-mode-context';
import { playfair } from '@/lib/fonts';
import React from 'react';

export default function Page() {
  return (
    <section className='mt-10'>
      <BlogModeProvider>
        <h2
          className={`${playfair.className} text-center font-semibold text-3xl`}
        >
          All Articles
        </h2>
        <div className='border flex items-center justify-between border-gray-200 rounded-lg p-4 mt-10 bg-white'>
          <Filters />
          <BlogMode />
        </div>
        <Articles />
      </BlogModeProvider>
      <div className='mt-10'>
        <PaginationWithLinks page={1} pageSize={20} totalCount={50} />
      </div>
    </section>
  );
}
