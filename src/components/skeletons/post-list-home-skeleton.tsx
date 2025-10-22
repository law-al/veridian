import React from 'react';
import PostCardSkeleton from './blog-card-skeleton';

export default function PostListHomeSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-10'>
      {Array.from({ length: 8 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
