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
  imageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
  slug = '/blog/cmgp5mzof000194wgk9nsk98r',
}: BlogCardProps) {
  const collapseText = (text: string, maxLength: number = 140): string => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <article className='w-full group'>
      <div className='bg-white !transition-all !duration-300 overflow-hidden h-full flex flex-col'>
        {/* Image Container */}
        <Link
          href={slug}
          className='relative h-56 overflow-hidden bg-gray-100 block rounded-md mb-4'
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover group-hover:scale-110 !transition-transform !duration-500'
            priority={false}
          />
        </Link>

        {/* Content Container */}
        <div className='flex flex-col flex-grow'>
          {/* Meta Information */}
          <div className='flex items-center gap-4 text-gray-500 text-sm mb-3'>
            <div className=''>
              <span className='!text-blue-main text-xs font-semibold uppercase tracking-wider'>
                {category}
              </span>
            </div>
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
            <h2 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-main transition-colors !duration-200 !line-clamp-2 capitalize'>
              {title}
            </h2>
          </Link>

          {/* Description */}
          {/* <p className='text-gray-600 text-sm leading-relaxed mb-5 flex-grow line-clamp-3'>
            {collapseText(excerpt)}
          </p> */}

          {/* Read More Link */}
          <Link
            href={slug}
            className='inline-flex items-center gap-2 text-blue-main font-semibold text-sm hover:gap-3 transition-all !duration-300 group/link'
          >
            Read More
            <ArrowRight className='w-4 h-4 group-hover/link:translate-x-1 transition-transform' />
          </Link>
        </div>
      </div>
    </article>
  );
}
