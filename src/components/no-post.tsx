import { FileX, Search, Filter } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  type?: 'no-posts' | 'no-results' | 'no-category';
  category?: string;
  searchTerm?: string;
}

export default function EmptyState({
  type = 'no-posts',
  category,
  searchTerm,
}: EmptyStateProps) {
  const content = {
    'no-posts': {
      icon: <FileX className='w-16 h-16 text-gray-400' />,
      title: 'No articles yet',
      description:
        'There are no published articles at the moment. Check back soon for new content!',
      showAction: false,
    },
    'no-results': {
      icon: <Search className='w-16 h-16 text-gray-400' />,
      title: 'No results found',
      description: searchTerm
        ? `We couldn't find any articles matching "${searchTerm}". Try different keywords or browse all articles.`
        : 'No articles match your search. Try different keywords or browse all articles.',
      showAction: true,
    },
    'no-category': {
      icon: <Filter className='w-16 h-16 text-gray-400' />,
      title: `No articles in "${category}"`,
      description: `There are no published articles in the ${category} category yet. Browse other categories or check back later.`,
      showAction: true,
    },
  };

  const { icon, title, description, showAction } = content[type];

  return (
    <div className='flex flex-col items-center justify-center py-20 px-4'>
      <div className='mb-6'>{icon}</div>
      <h3 className='text-2xl font-bold text-gray-900 mb-2 text-center'>
        {title}
      </h3>
      <p className='text-gray-600 text-center max-w-md mb-8'>{description}</p>
      {showAction && (
        <Link
          href='/articles'
          className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
        >
          Browse All Articles
        </Link>
      )}
    </div>
  );
}
