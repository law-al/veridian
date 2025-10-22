import { cn } from '@/lib/utils';

interface PostCardSkeletonProps {
  mode?: 'grid' | 'straight';
}

export default function PostCardSkeleton({
  mode = 'grid',
}: PostCardSkeletonProps) {
  return (
    <article className='w-full'>
      <div
        className={cn(
          'flex bg-white overflow-hidden h-full animate-pulse',
          mode === 'grid' && 'flex-col',
          mode === 'straight' &&
            'flex-col md:flex-row gap-4 md:gap-6 border border-gray-200 rounded-lg p-4'
        )}
      >
        {/* Image Skeleton */}
        <div
          className={cn(
            'bg-gray-200 flex-shrink-0 rounded-md',
            mode === 'grid' && 'w-full h-56 mb-4',
            mode === 'straight' && 'w-full md:w-72 h-48 md:h-auto'
          )}
        />

        {/* Content Skeleton */}
        <div
          className={cn(
            'flex flex-col',
            mode === 'grid' && 'flex-grow',
            mode === 'straight' && 'flex-1 justify-between'
          )}
        >
          <div>
            {/* Meta Information Skeleton */}
            <div className='flex flex-wrap items-center gap-3 md:gap-4 mb-3'>
              <div className='h-4 w-16 bg-gray-200 rounded' />
              <div className='h-4 w-24 bg-gray-200 rounded' />
              <div className='h-4 w-20 bg-gray-200 rounded' />
            </div>

            {/* Title Skeleton */}
            <div className='space-y-2 mb-3'>
              <div className='h-6 bg-gray-200 rounded w-full' />
              <div className='h-6 bg-gray-200 rounded w-3/4' />
            </div>

            {/* Description Skeleton - Show in straight mode */}
            {mode === 'straight' && (
              <div className='space-y-2 mb-4'>
                <div className='h-4 bg-gray-200 rounded w-full' />
                <div className='h-4 bg-gray-200 rounded w-full' />
                <div className='h-4 bg-gray-200 rounded w-2/3' />
              </div>
            )}
          </div>

          {/* Read More Skeleton */}
          <div className='h-5 w-24 bg-gray-200 rounded mt-auto' />
        </div>
      </div>
    </article>
  );
}
