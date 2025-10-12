'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Search from './search';
import { useNavContext } from '@/contexts/nav-context';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SearchBar() {
  const { openSearch, handleOpenSearch } = useNavContext();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        'opacity-0 invisible transition-all duration-300 ease-in-out border-2 border-gray-300 w-[500px] p-2 pr-10 relative rounded-md',
        openSearch && 'opacity-100 visible'
      )}
    >
      <Search />
      <FaTimes
        size={20}
        className='font-light text-gray-500 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
        onClick={() => {
          handleOpenSearch(false);

          const search = params.get('search');
          console.log(search);
          if (search) {
            params.delete('search');
            router.push(`${pathname}`);
          }
        }}
      />
    </div>
  );
}
