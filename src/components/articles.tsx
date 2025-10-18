'use client';
import { cn } from '@/lib/utils';
import BlogCard from './blog-card';
import { useBlogModeContext } from '@/contexts/blog-mode-context';
import { Prisma } from '@/generated/prisma';
import { PaginationWithLinks } from './pagination-with-links';

type PostResult = Prisma.PostGetPayload<{}>;

export default function Articles({
  posts,
  page = 1,
  pageSize = 6,
  totalCount,
}: {
  posts: PostResult[];
  page: number;
  pageSize: number;
  totalCount: number;
}) {
  const { mode } = useBlogModeContext();

  return (
    <div className='mt-10'>
      <div
        className={cn(
          mode === 'grid' && 'grid grid-cols-3 gap-4',
          mode === 'straight' && 'flex flex-col gap-2'
        )}
      >
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            mode={mode}
            imageUrl={post.coverImage}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
          />
        ))}
      </div>

      <div className='mt-10'>
        <PaginationWithLinks
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
