import PostCardSkeleton from './blog-card-skeleton';

export default function ArticlesLoading() {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-10'>
        {Array.from({ length: 8 }).map((_, i) => (
          <PostCardSkeleton key={i} mode='grid' />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className='mt-10 flex justify-center gap-2'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='h-10 w-10 bg-gray-200 rounded-lg animate-pulse'
          />
        ))}
      </div>
    </>
  );
}
