import React from 'react';
import AppButton from '../app-button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      style={{ backgroundImage: "url('/hero-1.png')" }}
      className='w-full h-[80vh] bg-cover bg-bottom bg-no-repeat'
    >
      <div className='mx-auto container my-6 grid grid-cols-2 gap-5 items-center h-full'>
        <div className=' p-3 space-y-5'>
          <h3 className='text-white uppercase font-semibold'>Featured Post</h3>
          <h2 className='text-white text-6xl capitalize font-semibold'>
            How Ai Will Change The World
          </h2>
          <p className='text-white block w-[85%]'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
            blanditiis officia neque dolore non dolores veritatis. Quia
            architecto neque accusantium saepe alias quaerat molestias quibusdam
            optio dolorum non, error laborum facere. Officiis reiciendis ullam
            enim magnam repudiandae delectus magni libero.
          </p>

          <AppButton
            type='outline'
            text='Read More'
            className='!bg-white rounded-md hover:!text-purple-500'
          />
        </div>
        <div className='h-full p-8'>
          <Image
            src='https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWl8ZW58MHx8MHx8fDA%3D'
            alt='AI changing the world'
            className='w-full h-full object-cover rounded-md'
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
