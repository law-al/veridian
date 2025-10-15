'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { quintessential } from '@/lib/fonts';

export default function NewsLetter() {
  return (
    <section className='mt-10 h-[50vh]'>
      <div className='flex flex-col items-center justify-center h-full space-y-6'>
        <h1 className={`${quintessential.className} text-5xl capitalize`}>
          Subscribe to our news letter
        </h1>

        <h2 className='text-charcoal text-3xl font-semibold w-[500px] text-center block mb-4'>
          Get our stories delivered from us to your inbox weekly
        </h2>

        <div className='flex h-[50px] w-full max-w-sm items-center gap-2'>
          <div className='h-full bg-gray-100 border-2 border-gray-400 focus-within:border-dark-charcoal px-2 py-1 rounded-md flex items-center gap-2 w-[300px] transition-colors group'>
            <input
              type='email'
              className='w-full border-none text-gray-600 focus:outline-none focus:ring-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0'
              placeholder='Enter an email address.'
            />
          </div>
          <Button
            size='lg'
            className='!h-full !bg-blue-main cursor-pointer hover:bg-[#93C5FD] !transition-all duration-300'
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
