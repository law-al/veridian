import { purifyHtml } from '@/lib/purify-html';
import slugify from 'slugify';

interface Data {
  name: string;
  slug: string;
}

export const categorySeeds: Data[] = [
  {
    name: 'lifestyle',
    slug: 'lifestyle',
  },
  {
    name: 'tech',
    slug: 'tech',
  },
  {
    name: 'finance',
    slug: 'finance',
  },
  {
    name: 'health & fitness',
    slug: 'health-fitness',
  },
  {
    name: 'travel',
    slug: 'travel',
  },
  {
    name: 'food',
    slug: 'food',
  },
  {
    name: 'parenting',
    slug: 'parenting',
  },
  {
    name: 'education',
    slug: 'education',
  },
  {
    name: 'fashion & beauty',
    slug: 'fashion-beauty',
  },
  {
    name: 'creative writing',
    slug: 'creative-writing',
  },
];

export const tagSeeds: Data[] = [
  { name: 'javascript', slug: slugify('javascript', { lower: true }) },
  { name: 'promises', slug: slugify('promises', { lower: true }) },
  { name: 'async', slug: slugify('async', { lower: true }) },
  { name: 'programming', slug: slugify('programming', { lower: true }) },
  { name: 'express', slug: slugify('express', { lower: true }) },
  { name: 'nodejs', slug: slugify('nodejs', { lower: true }) },
  { name: 'api', slug: slugify('api', { lower: true }) },
  { name: 'backend', slug: slugify('backend', { lower: true }) },
  { name: 'nextjs', slug: slugify('nextjs', { lower: true }) },
  { name: 'react', slug: slugify('react', { lower: true }) },
  { name: 'webdev', slug: slugify('webdev', { lower: true }) },
  { name: 'css', slug: slugify('css', { lower: true }) },
  { name: 'frontend', slug: slugify('frontend', { lower: true }) },
  { name: 'design', slug: slugify('design', { lower: true }) },
  { name: 'redux', slug: slugify('redux', { lower: true }) },
  {
    name: 'state-management',
    slug: slugify('state-management', { lower: true }),
  },
];
