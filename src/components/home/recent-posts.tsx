'use client';

import React from 'react';
import AppButton from '../app-button';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import AutoFade from 'embla-carousel-fade';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function RecentPosts() {
  return (
    <section className='w-full my-15'>
      <div className='mx-20'>
        <div className='flex items-center mb-6'>
          <h2 className='font-semibold text-4xl'>Our Recent Posts</h2>
          <Button
            asChild
            className={`ml-auto cursor-pointer rounded-xs text-base !px-6 py-6 transition-all 200ms text-white bg-purple-600 hover:bg-purple-500 border border-transparent`}
          >
            <Link href='/blog/add'>View All</Link>
          </Button>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
            AutoFade({ active: true }),
          ]}
          className='w-full'
        >
          <CarouselContent className=''>
            {Array.from({ length: 4 }).map((_, i) => (
              <CarouselItem
                key={i}
                className='grid grid-cols-2 items-center gap-5 h-[400px]'
              >
                <div className='h-[400px]'>
                  <Image
                    src='https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWl8ZW58MHx8MHx8fDA%3D'
                    alt='AI changing the world'
                    className='h-full w-full object-cover rounded-md'
                    width={300}
                    height={300}
                  />
                </div>
                <div className=' p-3 space-y-5'>
                  <h3 className='text-black uppercase font-semibold'>
                    Featured Post
                  </h3>
                  <h2 className='text-black text-5xl capitalize font-semibold'>
                    How Ai Will Change The World
                  </h2>
                  <p className='text-black block'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Laborum blanditiis officia neque dolore non dolores
                    veritatis. Quia architecto neque accusantium saepe alias
                    quaerat molestias quibusdam optio dolorum non, error laborum
                    facere. Officiis reiciendis ullam enim magnam repudiandae
                    delectus magni libero.
                  </p>

                  <AppButton
                    type='outline'
                    text='Read More'
                    className='!bg-white rounded-md hover:!text-purple-500'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
