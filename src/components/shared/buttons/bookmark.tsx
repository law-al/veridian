'use client';

import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function BookmarkButton() {
  const [saved, setSaved] = useState(false);

  return (
    <div className='inline-flex items-center gap-2'>
      <motion.div
        whileTap={{ scale: 0.85 }}
        animate={{
          scale: saved ? [1, 1.2, 1] : 1,
          rotate: saved ? [0, 10, -10, 0] : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={() => setSaved((prev) => !prev)}
        className='inline-block'
      >
        <Bookmark
          className={cn(
            'size-6 cursor-pointer text-gray-700 transition-colors',
            saved && 'fill-yellow-400 text-yellow-400'
          )}
        />
      </motion.div>

      <p className='text-sm text-gray-600'>{saved ? 'Saved' : 'Save'}</p>
    </div>
  );
}
