'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function CommentButton({
  commentsCount,
}: {
  commentsCount: number;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className='flex items-center gap-2 cursor-pointer'>
      <motion.div
        whileTap={{ scale: 0.85 }}
        animate={{
          scale: active ? [1, 1.25, 1] : 1,
          y: active ? [0, -4, 0] : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={() => {
          setActive((prev) => !prev);
          const commentElement = document.getElementById('commentBlock');

          if (commentElement) {
            commentElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });

            commentElement.focus();
          }
        }}
        className='inline-block'
      >
        <MessageSquare
          className={cn(
            'size-6 text-gray-400 transition-colors',
            active && 'text-blue-500'
          )}
        />
      </motion.div>

      <p className='text-sm text-gray-600'>
        <span className='font-medium text-gray-800'>{commentsCount} </span>
        {commentsCount ? 'Comments' : 'Comment'}
      </p>
    </div>
  );
}
