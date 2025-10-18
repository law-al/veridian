import React, { Suspense } from 'react';
import BlogCard from './blog-card';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BlogCardSkeleton from './skeletons/blog-card-skeleton';

export default async function Posts({
  category = 'all',
}: {
  category?: 'all' | 'tech' | 'travel' | 'parenting' | 'food' | 'finance';
}) {
  const getCategory = () => {
    if (category === 'all') return undefined;
    else return category;
  };

  const posts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      category: {
        some: {
          slug: getCategory(),
        },
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 6,
  });

  if (posts.length === 0) {
    return (
      <section id='posts' className='mt-10'>
        <div className='text-center py-12'>
          <h3 className='text-2xl font-semibold text-gray-700 mb-2'>
            No posts found
          </h3>
          <p className='text-gray-500'>
            {category === 'all'
              ? 'There are no published posts yet.'
              : `No posts found in the "${category}" category.`}
          </p>
        </div>
      </section>
    );
  }
  return (
    <section id='posts' className='mt-10 scroll scroll-smooth'>
      <div className='space-y-8'>
        <div className='grid grid-cols-3 gap-10 justify-between'>
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              excerpt={post.excerpt}
              imageUrl={post.coverImage}
              slug={post.slug}
              title={post.title}
              category={post.category[0].name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
