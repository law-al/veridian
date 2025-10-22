'use client';
import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import AutoFade from 'embla-carousel-fade';
import { Button } from '../../ui/button';
import Link from 'next/link';

export default function FeaturedPosts() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
        AutoFade({ active: true }),
      ]}
      className='h-[80vh] rounded-xl overflow-hidden relative'
    >
      <CarouselContent className='h-full'>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className='relative h-full min-h-[80vh]'>
            <Image
              src='https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600'
              alt='main image'
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-black/50'></div>
            <div className='absolute bottom-0 space-y-4 p-6 text-white z-10'>
              <h3 className='text-2xl'>FeaturedPosts</h3>
              <h2 className='text-5xl capitalize'>
                The timeless art of storytelling
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                accusamus harum, alias rerum quos, iure distinctio excepturi
                nobis earum minima consequatur amet, deserunt culpa quam aperiam
                ex assumenda magnam temporibus.
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
