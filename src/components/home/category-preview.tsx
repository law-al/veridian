'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const categories = [
  'all',
  'technology',
  'health',
  'business',
  'design',
  'culture',
];

export default function CategoryPreview({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const getParams = useCallback(() => {
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  const setParams = useCallback(
    (category: string): string => {
      if (category) {
        params.set('category', category);
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    getParams();
  }, [getParams]);

  return (
    <section className='mt-20'>
      <div className='flex items-center space-x-3'>
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              router.replace(`/?${setParams(category)}`, { scroll: false });
            }}
            className={cn(
              'border-2 border-transparent bg-[#B0E0E6] capitalize text-blue-500 w-fit rounded-xl py-1 px-4 cursor-pointer !transition-all duration-300',
              selectedCategory === category && 'border-blue-500'
            )}
          >
            <p>{category}</p>
          </div>
        ))}
      </div>

      <div className=''>{children}</div>
    </section>
  );
}
