import AppButton from '@/components/app-button';
import Hero from '@/components/home/hero';
import Posts from '@/components/posts';
import RecentPosts from '@/components/home/recent-posts';

import React from 'react';
import NewsLetter from '@/components/home/news-letter';

export default function Page() {
  return (
    <>
      <Hero />
      <RecentPosts />
      <Posts />
      <NewsLetter />
    </>
  );
}
