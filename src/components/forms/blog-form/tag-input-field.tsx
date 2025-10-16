import React, { KeyboardEvent, useRef, useState } from 'react';

import { XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateBlogContext } from '@/contexts/create-blog-context';
import { Button } from '../../ui/button';
import { cn } from '@/lib/tiptap-utils';

export default function TagField({
  submitting = false,
}: {
  submitting?: boolean;
}) {
  const { tags, handleSetTags } = useCreateBlogContext();

  const [inputTags, setInputTags] = useState<string>('');

  const addTag = () => {
    if (!inputTags) return;
    handleSetTags(inputTags.trim(), 'add');
    setInputTags('');
  };

  const handleSetTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    addTag();
  };

  const removeTag = (tagToRemove: string) => {
    handleSetTags(tagToRemove, 'delete');
  };

  return (
    <>
      <label htmlFor='tags' className='font-semibold'>
        Tags
      </label>
      <div className='mt-1 mb-1 flex items-center gap-2'>
        <div className='flex-1'>
          <input
            id='tags'
            type='text'
            value={inputTags}
            disabled={submitting}
            onChange={(e) => setInputTags(e.target.value.toLowerCase())}
            onKeyDown={handleSetTag}
            placeholder='Provide tags'
            className={cn(
              'bg-white px-4 w-full !text-base rounded-md !h-[45px] border-2 border-gray-300 active:border-blue-main focus:border-blue-main focus-within:border-blue-main focus-visible:!border-blue-main ring-0 hover:ring-0 active:ring-0 focus:ring-0 focus-within:ring-0 focus-visible:ring-0 outline-none focus:outline-none',
              submitting && 'cursor-not-allowed'
            )}
          />
        </div>
        <Button
          type='button'
          disabled={submitting}
          onClick={addTag}
          className={cn(
            '!h-[45px] w-30 !rounded-md cursor-pointer !bg-blue-main !text-white hover:scale-105 hover:bg-blue-main !transition !duration-300 ease-in-out',
            submitting && 'cursor-not-allowed !bg-purple-300'
          )}
        >
          Add Tags
        </Button>
      </div>
      <div className='mt-1 flex flex-wrap gap-2'>
        <AnimatePresence mode='popLayout'>
          {tags.size > 0 &&
            [...tags].map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                transition={{ duration: 0.2 }}
                className='bg-blue-main px-2 py-1 flex items-center gap-2 text-white rounded-lg w-fit'
              >
                <p>{tag}</p>
                <XCircle
                  className='size-4 cursor-pointer hover:text-red-300 transition-colors'
                  onClick={() => removeTag(tag)}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </>
  );
}
