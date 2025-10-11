import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function NewsLetter() {
  return (
    <section
      style={{
        backgroundImage: 'url("/hero-1.png")',
      }}
      className='w-full bg-no-repeat bg-cover bg-top h-[50vh]'
    >
      <div className='container mx-auto flex flex-col items-center justify-center h-full'>
        <h2 className='text-white text-3xl font-semibold w-[500px] text-center block mb-4'>
          Get our stories delivered from us to your inbox weekly
        </h2>

        <div className='flex w-full max-w-sm items-center gap-2'>
          <Input
            type='email'
            placeholder='Email'
            required
            className='ring ring-white text-lg text-white rounded-sm placeholder:text-gray-300 h-[50px]'
          />
          <Button
            type='submit'
            variant='outline'
            className='rounded-sm cursor-pointer h-[50px]'
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
