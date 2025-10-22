'use client';

import React from 'react';
import { Button } from '../../ui/button';
import { playfair } from '@/lib/fonts';
import { motion } from 'framer-motion';
import FeaturedPosts from '@/components/pages/home/featured-posts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function HeroSection() {
  return (
    <section className='mt-10 w-full h-[80vh]'>
      <div className='grid grid-cols-2 gap-5 items-center h-full'>
        <motion.div
          className='p-3 space-y-7'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.h1
            className={`${playfair.className} text-charcoal capitalize font-semibold tracking-tight text-8xl`}
            variants={itemVariants}
          >
            Where curiosity meets content
          </motion.h1>
          <motion.p
            className='text-charcoal block w-[85%]'
            variants={itemVariants}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
            blanditiis officia neque dolore non dolores veritatis. Quia
            architecto neque accusantium saepe alias quaerat molestias quibusdam
            optio dolorum non, error laborum facere. Officiis reiciendis ullam
            enim magnam repudiandae delectus magni libero.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              size='lg'
              className='!bg-blue-main !h-13 cursor-pointer hover:bg-[#93C5FD] !transition-all duration-300'
            >
              Explore Articles
            </Button>
          </motion.div>
        </motion.div>

        <FeaturedPosts />
      </div>
    </section>
  );
}
