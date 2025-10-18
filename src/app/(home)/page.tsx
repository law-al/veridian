import Hero from '@/components/home/hero';
import Posts from '@/components/posts';
import RecentPosts from '@/components/home/featured';

import React, { Suspense } from 'react';
import NewsLetter from '@/components/home/news-letter';
import CategoryPreview from '@/components/home/category-preview';
import BlogCardSkeleton from '@/components/skeletons/blog-card-skeleton';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: 'all' | 'tech' | 'travel' | 'parenting' | 'food' | 'finance';
  }>;
}) {
  const { category = 'all' } = await searchParams;

  return (
    <>
      <Hero />
      <CategoryPreview>
        <Posts category={category} />
      </CategoryPreview>
      <NewsLetter />
    </>
  );
}
