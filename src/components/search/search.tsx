'use client';

import { SearchIcon } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback, useDebounce } from 'use-debounce';

export default function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleSearch = useDebouncedCallback((searchText: string) => {
    if (searchText) {
      params.set('search', searchText);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}#posts`);
  }, 600);

  return (
    <form className='h-full'>
      <div className='h-full bg-gray-100 border-2 border-gray-400 focus-within:border-dark-charcoal px-2 py-1 rounded-md flex items-center gap-2 w-[300px] transition-colors group'>
        <SearchIcon className='size-5 text-gray-400 group-focus-within:text-dark-charcoal transition-colors' />
        <input
          type='text'
          className='w-full border-none text-gray-600 focus:outline-none focus:ring-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0'
          placeholder='Search...'
          defaultValue={searchParams.get('search')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </form>
  );
}
