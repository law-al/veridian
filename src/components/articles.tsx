'use client';
import { cn } from '@/lib/utils';
import BlogCard from './blog-card';
import { useBlogModeContext } from '@/contexts/blog-mode-context';

export default function Articles() {
  const { mode } = useBlogModeContext();

  return (
    <div className='mt-10'>
      <div
        className={cn(
          mode === 'grid' && 'grid grid-cols-4 gap-4',
          mode === 'straight' && 'flex flex-col gap-2'
        )}
      >
        <BlogCard mode={mode} />
        <BlogCard mode={mode} />
        <BlogCard mode={mode} />
        <BlogCard mode={mode} />
        <BlogCard mode={mode} />
      </div>
    </div>
  );
}
