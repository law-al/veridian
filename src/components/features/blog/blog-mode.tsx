'use client';

import { useBlogModeContext } from '@/contexts/blog-mode-context';
import { LayoutGrid, List } from 'lucide-react';

export default function BlogModeToggle() {
  const { mode, handleSetMode } = useBlogModeContext();

  return (
    <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
      <button
        onClick={() => handleSetMode('grid')}
        className={`p-2 transition-colors ${
          mode === 'grid'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
        aria-label='Grid view'
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => handleSetMode('straight')}
        className={`p-2 transition-colors ${
          mode === 'straight'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
        aria-label='List view'
      >
        <List size={20} />
      </button>
    </div>
  );
}
