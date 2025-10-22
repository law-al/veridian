import ArticlesList from '@/components/features/articles/articles-list';
import BlogMode from '@/components/features/blog/blog-mode';
import ArticlesFilters from '@/components/features/articles/articles-filters';
import BlogModeProvider from '@/contexts/blog-mode-context';
import { playfair } from '@/lib/fonts';
import React, { Suspense } from 'react';
import { getArticles, getTotalPost } from '@/lib/data';
import EmptyState from '@/components/common/empty-state';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    sort: 'newest' | 'oldest' | 'most_liked' | 'most_commented';
    page: string;
  }>;
}) {
  const { search, sort, page = '1' } = await searchParams;

  const results = await Promise.all([
    getArticles(search, sort, page),
    getTotalPost(search),
  ]);

  return (
    <section className='mt-10'>
      <BlogModeProvider>
        <h2
          className={`${playfair.className} text-center font-semibold text-3xl`}
        >
          All Articles
        </h2>
        <div className='border flex items-center justify-between border-gray-200 rounded-lg p-4 mt-10 bg-white'>
          <ArticlesFilters />
          <BlogMode />
        </div>

        {results[0].length < 1 ? (
          <EmptyState type='no-results' searchTerm={search} />
        ) : (
          <ArticlesList
            posts={results[0]}
            page={+page}
            pageSize={6}
            totalCount={results[1]}
          />
        )}
      </BlogModeProvider>
    </section>
  );
}
