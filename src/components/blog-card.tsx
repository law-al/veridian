import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title?: string;
  category?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  imageUrl?: string;
  slug?: string;
}

export default function BlogCard({
  title = 'Rules to Know Before Travelling',
  category = 'Travel',
  date = '12 Oct 2024',
  readTime = '5 min read',
  excerpt = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, maxime deleniti. Cum ab iste ex ipsa non quod dolorem doloribus nemo earum nesciunt voluptate, recusandae minima praesentium quaerat. Debitis, ratione.',
  imageUrl = 'https://images.unsplash.com/photo-1759681770982-313332e7f42c?q=80&w=800&h=800&auto=format&fit=crop',
  slug = '/',
}: BlogCardProps) {
  const collapseText = (text: string, maxLength: number = 140): string => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <article className='w-full group'>
      <div className='bg-white rounded-xl shadow-lg hover:shadow-2xl !transition-all !duration-300 overflow-hidden h-full flex flex-col'>
        {/* Image Container */}
        <Link
          href={slug}
          className='relative h-56 overflow-hidden bg-gray-100 block'
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover group-hover:scale-110 !transition-transform !duration-500'
            priority={false}
          />
          {/* Category Badge */}
          <div className='absolute top-4 left-4 z-10'>
            <span className='bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md'>
              {category}
            </span>
          </div>
        </Link>

        {/* Content Container */}
        <div className='p-6 flex flex-col flex-grow'>
          {/* Meta Information */}
          <div className='flex items-center gap-4 text-gray-500 text-sm mb-3'>
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
          <Link href={slug}>
            <h2 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors !duration-200 !line-clamp-2 capitalize'>
              {title}
            </h2>
          </Link>

          {/* Description */}
          <p className='text-gray-600 text-sm leading-relaxed mb-5 flex-grow line-clamp-3'>
            {collapseText(excerpt)}
          </p>

          {/* Read More Link */}
          <Link
            href={slug}
            className='inline-flex items-center gap-2 text-purple-600 font-semibold text-sm hover:gap-3 transition-all !duration-300 group/link'
          >
            Read More
            <ArrowRight className='w-4 h-4 group-hover/link:translate-x-1 transition-transform' />
          </Link>
        </div>
      </div>
    </article>
  );
}
