import HeroSection from '@/components/pages/home/hero-section';
import PostListHome from '@/components/pages/home/post-list-home';

import React, { Suspense } from 'react';
import NewsLetter from '@/components/pages/home/newsletter';
import CategoryPreview from '@/components/pages/home/category-preview';
import PostListHomeSkeleton from '@/components/skeletons/post-list-home-skeleton';

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
      <HeroSection />
      <CategoryPreview>
        <Suspense fallback={<PostListHomeSkeleton />}>
          <PostListHome category={category} />
        </Suspense>
      </CategoryPreview>
      <NewsLetter />
    </>
  );
}
