'use client';
import { motion } from 'framer-motion';
import { ThumbsUp } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { useDebouncedCallback } from 'use-debounce';
import { updateLikes } from '@/lib/actions/likes';

export default function LikeButton({
  postId,
  slug,
  likesCount,
  initialLiked,
}: {
  postId: string;
  slug: string;
  likesCount: number;
  initialLiked?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const [optimisticLike, setOptimisticLike] = useOptimistic(
    { liked: initialLiked, count: likesCount },
    (currentState, newState: { liked: boolean }) => ({
      liked: newState.liked,
      count: newState.liked ? currentState.count + 1 : currentState.count - 1,
    })
  );

  const handleLikesCount = useDebouncedCallback(() => {
    const newLikeState = !optimisticLike.liked;

    startTransition(async () => {
      setOptimisticLike({ liked: newLikeState });

      try {
        await updateLikes({ postId, slug, liked: newLikeState });
      } catch (error) {
        console.error('Failed to update like:', error);
      }
    });
  }, 300);

  return (
    <div className='flex items-center gap-2'>
      <motion.div
        whileTap={{ scale: 0.8 }}
        animate={{
          scale: optimisticLike.liked ? [1, 1.3, 1] : 1,
          rotate: optimisticLike.liked ? [0, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={() => handleLikesCount()}
        className='inline-block'
      >
        <ThumbsUp
          className={cn(
            'size-6 cursor-pointer text-gray-400 font-light transition-colors',
            optimisticLike.liked && 'text-yellow-400 fill-yellow-400',
            isPending && 'opacity-70' // Optional: show loading state
          )}
        />
      </motion.div>
      <p className='text-sm text-gray-600'>
        <span className='font-medium text-gray-800'>
          {optimisticLike.count}{' '}
        </span>
        {optimisticLike.count === 1 ? 'Like' : 'Likes'}
      </p>
    </div>
  );
}
