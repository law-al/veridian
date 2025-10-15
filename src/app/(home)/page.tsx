import Hero from '@/components/home/hero';
import Posts from '@/components/posts';
import RecentPosts from '@/components/home/featured';

import React from 'react';
import NewsLetter from '@/components/home/news-letter';
import CategoryPreview from '@/components/home/category-preview';

export default function Page() {
  return (
    <>
      <Hero />
      <CategoryPreview>
        <Posts />
      </CategoryPreview>
      <NewsLetter />
    </>
  );
}
