// app/blog/loading.tsx (Final Recommendation)
import PostCardSkeleton from '@/components/skeletons/blog-card-skeleton';
import { playfair } from '@/lib/fonts';

export default function Loading() {
  return (
    <section className='mt-10 animate-pulse'>
      <h2
        className={`${playfair.className} text-center font-semibold text-3xl`}
      >
        All Articles
      </h2>

      <div className='border flex items-center justify-between border-gray-200 rounded-lg p-4 mt-10 bg-white'>
        <div className='flex gap-4'>
          <div className='h-10 w-32 bg-gray-200 rounded-lg' />
          <div className='h-10 w-32 bg-gray-200 rounded-lg' />
        </div>
        <div className='h-10 w-20 bg-gray-200 rounded-lg' />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-10'>
        {Array.from({ length: 8 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
