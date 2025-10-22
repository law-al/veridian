export default function Loading() {
  return (
    <section className='mt-10 w-[1200px] mx-auto animate-pulse'>
      {/* Author Profile Skeleton */}
      <div className='flex items-center gap-4 mb-8'>
        <div className='w-12 h-12 bg-gray-200 rounded-full'></div>
        <div className='flex-1'>
          <div className='h-4 bg-gray-200 rounded w-32 mb-2'></div>
          <div className='h-3 bg-gray-200 rounded w-24'></div>
        </div>
      </div>

      {/* Blog Details Container */}
      <div className='space-y-8'>
        {/* Blog Meta Skeleton */}
        <div>
          {/* Title */}
          <div className='h-10 bg-gray-200 rounded w-3/4 mb-4'></div>
          <div className='h-10 bg-gray-200 rounded w-2/3 mb-6'></div>

          {/* Excerpt */}
          <div className='space-y-2 mb-6'>
            <div className='h-4 bg-gray-200 rounded w-full'></div>
            <div className='h-4 bg-gray-200 rounded w-5/6'></div>
            <div className='h-4 bg-gray-200 rounded w-4/5'></div>
          </div>

          {/* Cover Image */}
          <div className='w-full h-[400px] bg-gray-200 rounded-lg mb-8'></div>
        </div>

        {/* Blog Content Skeleton */}
        <div className='space-y-4'>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-4/5'></div>

          <div className='h-6 bg-gray-200 rounded w-2/3 my-6'></div>

          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
        </div>

        {/* Post Actions Skeleton */}
        <div className='mt-10 border-y-2 border-gray-200 py-5 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
            <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
            <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
          </div>
          <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
        </div>
      </div>

      {/* Author Details Skeleton */}
      <div className='w-full max-w-2xl my-6 mx-auto bg-gray-50 rounded-lg p-6'>
        <div className='flex items-start gap-4'>
          <div className='w-16 h-16 bg-gray-200 rounded-full flex-shrink-0'></div>
          <div className='flex-1 space-y-3'>
            <div className='h-3 bg-gray-200 rounded w-20'></div>
            <div className='h-6 bg-gray-200 rounded w-32'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
            </div>
            <div className='h-10 bg-gray-200 rounded w-24'></div>
          </div>
        </div>
      </div>

      {/* Comment Section Skeleton */}
      <div className='w-full max-w-3xl mx-auto'>
        {/* Header */}
        <div className='h-8 bg-gray-200 rounded w-40 mb-6'></div>

        {/* Comment Input */}
        <div className='mb-8'>
          <div className='flex gap-3'>
            <div className='w-10 h-10 bg-gray-200 rounded-full flex-shrink-0'></div>
            <div className='flex-1'>
              <div className='h-24 bg-gray-200 rounded-lg mb-3'></div>
              <div className='flex justify-end'>
                <div className='h-10 bg-gray-200 rounded w-32'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className='space-y-6'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex gap-3'>
              <div className='w-10 h-10 bg-gray-200 rounded-full flex-shrink-0'></div>
              <div className='flex-1 bg-gray-100 rounded-lg p-4 space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-32'></div>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-4/5'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
