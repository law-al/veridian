'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import BlogMode from './blog-mode';

interface SelectData {
  value: string;
  item: string;
}

interface SelectItems {
  label: string;
  data: SelectData[];
}

const categories: SelectItems[] = [
  {
    label: 'Category',
    data: [
      { value: 'lifestyle', item: 'Lifestyle' },
      { value: 'tech', item: 'Tech' },
      { value: 'finance', item: 'Finance' },
      { value: 'health', item: 'Health & Fitness' },
      { value: 'travel', item: 'Travel' },
      { value: 'food', item: 'Food' },
      { value: 'parenting', item: 'Parenting' },
      { value: 'education', item: 'Education' },
      { value: 'fashion', item: 'Fashion & Beauty' },
      { value: 'creative', item: 'Creative Writing' },
    ],
  },
];

const sort: SelectItems[] = [
  {
    label: 'Sort By',
    data: [
      { value: 'newest', item: 'Newest first' },
      { value: 'oldest', item: 'Oldest first' },
      { value: 'most_liked', item: 'Most liked' },
      { value: 'most_commented', item: 'Most commented' },
    ],
  },
];

function SelectFilter({
  placeholder,
  items,
  type,
  selectedFilter,
  onSelectFilter,
}: {
  placeholder: string;
  items: SelectItems[];
  type: 'category' | 'sort';
  selectedFilter: string;
  onSelectFilter: (val: string, type: 'category' | 'sort') => void;
}) {
  return (
    <Select
      value={selectedFilter}
      onValueChange={(val) => onSelectFilter(val, type)}
    >
      <SelectTrigger className='w-[180px] bg-white !text-base !h-[45px] !border-2 border-gray-300 focus:border-blue-main focus-visible:ring-0'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.item}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || '';

  const setParams = useCallback(
    (val: string, type: 'category' | 'sort') => {
      const params = new URLSearchParams(searchParams.toString());

      if (val) {
        params.set(type, val);
        params.set('page', '1');
      } else {
        params.delete(type);
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className='flex items-center gap-4'>
      <SelectFilter
        type='category'
        items={categories}
        onSelectFilter={setParams}
        selectedFilter={category}
        placeholder='Select category'
      />
      <SelectFilter
        type='sort'
        items={sort}
        onSelectFilter={setParams}
        selectedFilter={sortBy}
        placeholder='Sort by'
      />
    </div>
  );
}
