'use client';

import { useNavContext } from '@/contexts/nav-context';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchButton() {
  const { openSearch, handleOpenSearch } = useNavContext();
  return (
    <FaSearch
      size={20}
      className='font-light text-gray-500 cursor-pointer'
      onClick={() => handleOpenSearch()}
    />
  );
}
