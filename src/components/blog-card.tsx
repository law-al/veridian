import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlogModeContext } from '@/contexts/blog-mode-context';

interface BlogCardProps {
  title?: string;
  category?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  imageUrl?: string;
  slug?: string;
  mode?: 'grid' | 'straight';
}

export default function BlogCard({
  title = 'Rules to Know Before Travelling',
  category = 'Travel',
  date = '12 Oct 2024',
  readTime = '5 min read',
  excerpt = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, maxime deleniti. Cum ab iste ex ipsa non quod dolorem doloribus nemo earum nesciunt voluptate, recusandae minima praesentium quaerat. Debitis, ratione.',
  imageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
  slug = 'how-to-use-cloudinary',
  mode = 'grid',
}: BlogCardProps) {
  return (
    <article className='w-full group'>
      <div
        className={cn(
          'flex bg-white transition-all duration-300 overflow-hidden h-full',
          mode === 'grid' && 'flex-col',
          mode === 'straight' &&
            'flex-col md:flex-row gap-4 md:gap-6 border border-gray-200 rounded-lg p-4'
        )}
      >
        {/* Image Container */}
        <Link
          href={`/articles/${slug}`}
          className={cn(
            'relative overflow-hidden bg-gray-100 block flex-shrink-0',
            mode === 'grid' && 'w-full h-56 mb-4 rounded-md',
            mode === 'straight' && 'w-full md:w-72 h-48 md:h-auto rounded-md'
          )}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes={
              mode === 'grid'
                ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                : '(max-width: 768px) 100vw, 288px'
            }
            className={cn(
              'object-cover transition-transform duration-500',
              mode === 'grid' && 'group-hover:scale-110'
            )}
            priority={false}
          />
        </Link>

        {/* Content Container */}
        <div
          className={cn(
            'flex flex-col',
            mode === 'grid' && 'flex-grow',
            mode === 'straight' && 'flex-1 justify-between'
          )}
        >
          <div>
            {/* Meta Information */}
            <div className='flex flex-wrap items-center gap-3 md:gap-4 text-gray-500 text-sm mb-3'>
              <span className='text-blue-600 text-xs font-semibold uppercase tracking-wider'>
                {category}
              </span>
              <div className='flex items-center gap-1.5'>
                <Calendar className='w-4 h-4' />
                <time dateTime={date}>{date}</time>
              </div>
              <div className='flex items-center gap-1.5'>
                <Clock className='w-4 h-4' />
                <span>{readTime}</span>
              </div>
            </div>

            {/* Title */}
            <Link href={`/articles/${slug}`}>
              <h2 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 capitalize'>
                {title}
              </h2>
            </Link>

            {/* Description - Show in straight mode */}
            {mode === 'straight' && (
              <p className='text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-4'>
                {excerpt}
              </p>
            )}
          </div>

          {/* Read More Link */}
          <Link
            href={`/articles/${slug}`}
            className='inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300 group/link mt-auto'
          >
            Read More
            <ArrowRight className='w-4 h-4 group-hover/link:translate-x-1 transition-transform' />
          </Link>
        </div>
      </div>
    </article>
  );
}
