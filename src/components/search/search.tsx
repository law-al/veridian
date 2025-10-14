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
    <form>
      <input
        type='text'
        className='w-full h-6 border-none text-gray-600 focus:outline-none focus:ring-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0'
        placeholder='Search...'
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
  );
}
