import { BlogStatus } from '@/generated/prisma';
import slugify from 'slugify';

interface Data {
  name: string;
  slug: string;
}

export const categorySeeds: Data[] = [
  { name: 'lifestyle', slug: 'lifestyle' },
  { name: 'tech', slug: 'tech' },
  { name: 'finance', slug: 'finance' },
  { name: 'health & fitness', slug: 'health-fitness' },
  { name: 'travel', slug: 'travel' },
  { name: 'food', slug: 'food' },
  { name: 'parenting', slug: 'parenting' },
  { name: 'education', slug: 'education' },
  { name: 'fashion & beauty', slug: 'fashion-beauty' },
  { name: 'creative writing', slug: 'creative-writing' },
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

// HTML content from Tiptap editor
const sampleContent1 = `
<h1>Understanding JavaScript Promises</h1>
<p>Promises are a fundamental concept in modern JavaScript development. They provide a cleaner way to handle asynchronous operations compared to traditional callback patterns.</p>
<h2>What is a Promise?</h2>
<p>A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to write asynchronous code in a more synchronous fashion.</p>
<pre><code class="language-javascript">const promise = new Promise((resolve, reject) => {
  // Async operation here
  setTimeout(() => {
    resolve('Operation successful!');
  }, 1000);
});

promise.then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});</code></pre>
<h2>Key Benefits</h2>
<ul>
  <li>Cleaner error handling with .catch()</li>
  <li>Better code readability</li>
  <li>Easier chaining of async operations</li>
  <li>Built-in error propagation</li>
</ul>
<p>Understanding promises is crucial for modern JavaScript development, especially when working with APIs and database operations.</p>
`;

const sampleContent2 = `
<h1>Getting Started with Next.js</h1>
<p>Next.js is a powerful React framework that makes building modern web applications a breeze. It provides features like server-side rendering, static site generation, and API routes out of the box.</p>
<h2>Why Choose Next.js?</h2>
<p>Next.js offers several advantages over vanilla React:</p>
<ul>
  <li><strong>File-based routing</strong> - No need to configure routes manually</li>
  <li><strong>Server-side rendering</strong> - Better SEO and initial page load</li>
  <li><strong>API routes</strong> - Build your backend in the same project</li>
  <li><strong>Image optimization</strong> - Automatic image resizing and optimization</li>
</ul>
<h2>Quick Start</h2>
<pre><code class="language-bash">npx create-next-app@latest my-app
cd my-app
npm run dev</code></pre>
<p>Visit <code>http://localhost:3000</code> to see your new Next.js application!</p>
`;

const sampleContent3 = `
<h1>Building RESTful APIs with Express</h1>
<p>Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.</p>
<h2>Setting Up Express</h2>
<p>First, install Express in your Node.js project:</p>
<pre><code class="language-bash">npm install express</code></pre>
<h2>Basic Server Example</h2>
<pre><code class="language-javascript">const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});</code></pre>
<h2>REST Principles</h2>
<ol>
  <li>Use proper HTTP methods (GET, POST, PUT, DELETE)</li>
  <li>Use meaningful URLs</li>
  <li>Return appropriate status codes</li>
  <li>Keep endpoints stateless</li>
</ol>
`;

const sampleContent4 = `
<h1>CSS Grid vs Flexbox: When to Use Each</h1>
<p>Both CSS Grid and Flexbox are powerful layout systems, but they excel in different scenarios. Understanding when to use each is crucial for efficient web development.</p>
<h2>Flexbox: One-Dimensional Layouts</h2>
<p>Flexbox is perfect for laying out items in a single row or column:</p>
<pre><code class="language-css">.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}</code></pre>
<p><strong>Best for:</strong></p>
<ul>
  <li>Navigation bars</li>
  <li>Card layouts in a row</li>
  <li>Centering content</li>
  <li>Form layouts</li>
</ul>
<h2>CSS Grid: Two-Dimensional Layouts</h2>
<p>CSS Grid excels at creating complex two-dimensional layouts:</p>
<pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}</code></pre>
<p><strong>Best for:</strong></p>
<ul>
  <li>Page layouts</li>
  <li>Image galleries</li>
  <li>Dashboard layouts</li>
  <li>Magazine-style layouts</li>
</ul>
<blockquote>
  <p>Pro tip: You can use Grid and Flexbox together! Use Grid for the overall page layout and Flexbox for component-level layouts.</p>
</blockquote>
`;

const sampleContent5 = `
<h1>State Management with Redux</h1>
<p>Redux provides a predictable state container for JavaScript applications. It helps you write applications that behave consistently across different environments.</p>
<h2>Core Concepts</h2>
<h3>Store</h3>
<p>The single source of truth that holds your application state.</p>
<h3>Actions</h3>
<p>Plain objects describing what happened:</p>
<pre><code class="language-javascript">const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: { text }
});</code></pre>
<h3>Reducers</h3>
<p>Pure functions that specify how the state changes:</p>
<pre><code class="language-javascript">function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
}</code></pre>
<h2>When to Use Redux</h2>
<p>Consider Redux when:</p>
<ul>
  <li>You have lots of application state</li>
  <li>State is updated frequently</li>
  <li>Logic to update state is complex</li>
  <li>App has a medium or large codebase</li>
  <li>Many people work on the codebase</li>
</ul>
`;
const sampleContent6 = `
<h1>Understanding Async/Await in JavaScript</h1>
<p>Async/Await simplifies working with Promises and asynchronous code in JavaScript.</p>
<h2>What is Async?</h2>
<p>The <code>async</code> keyword makes a function return a Promise.</p>
<h2>What is Await?</h2>
<p>The <code>await</code> keyword pauses execution until the Promise resolves, making code easier to read and maintain.</p>
<pre><code class="language-javascript">
async function fetchData() {
  const res = await fetch('/api/data');
  const data = await res.json();
  console.log(data);
}
</code></pre>
<p>Use Async/Await when you want cleaner asynchronous flows without nested callbacks.</p>
`;

const sampleContent7 = `
<h1>Building REST APIs with Express and Node.js</h1>
<p>Express is a fast and minimal web framework for Node.js that simplifies backend API development.</p>
<h2>Setting Up</h2>
<pre><code class="language-javascript">
import express from 'express';
const app = express();

app.get('/api/posts', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
</code></pre>
<p>This example shows how easy it is to create an API route using Express.js.</p>
`;

const sampleContent8 = `
<h1>Next.js 15 Features You Should Know</h1>
<p>Next.js 15 introduces major upgrades like server actions, improved routing, and performance optimizations.</p>
<ul>
  <li>Server Actions for cleaner data mutations</li>
  <li>Smarter caching and bundling</li>
  <li>Enhanced developer experience</li>
</ul>
<p>Next.js continues to bridge the gap between frontend and backend with seamless integration.</p>
`;

const sampleContent9 = `
<h1>CSS Grid vs Flexbox: When to Use Each</h1>
<p>Both CSS Grid and Flexbox are powerful layout systems. Grid is two-dimensional (rows and columns), while Flexbox is one-dimensional.</p>
<ul>
  <li>Use <strong>Flexbox</strong> for smaller layouts or alignment along one axis.</li>
  <li>Use <strong>Grid</strong> for full-page layouts and two-dimensional positioning.</li>
</ul>
`;

const sampleContent10 = `
<h1>State Management with Redux</h1>
<p>Redux provides a predictable state container for JavaScript apps, ensuring consistent behavior across environments.</p>
<h2>Core Concepts</h2>
<h3>Store</h3>
<p>The single source of truth for your app's state.</p>
<h3>Actions</h3>
<p>Describe what happened:</p>
<pre><code class="language-javascript">
const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: { text }
});
</code></pre>
<h3>Reducers</h3>
<pre><code class="language-javascript">
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
}
</code></pre>
`;

const sampleContent11 = `
<h1>10 Lifestyle Habits for Better Productivity</h1>
<p>Small daily habits can make a huge impact on your productivity and mindset.</p>
<ul>
  <li>Wake up early</li>
  <li>Plan your day</li>
  <li>Exercise regularly</li>
  <li>Take breaks and rest</li>
</ul>
<p>Balancing health and work helps you stay focused and creative.</p>
`;

const sampleContent12 = `
<h1>Financial Planning for Beginners</h1>
<p>Learn the basics of managing your finances, budgeting, and saving for the future.</p>
<ul>
  <li>Create a monthly budget</li>
  <li>Track your spending</li>
  <li>Invest early</li>
  <li>Build an emergency fund</li>
</ul>
`;

const sampleContent13 = `
<h1>Healthy Living: Nutrition and Fitness Tips</h1>
<p>Good nutrition and fitness are key to a balanced and healthy lifestyle.</p>
<ul>
  <li>Eat more vegetables and whole foods</li>
  <li>Exercise at least 3 times a week</li>
  <li>Stay hydrated</li>
  <li>Sleep at least 7 hours a night</li>
</ul>
`;

export const postSeeds = [
  {
    title: 'Understanding JavaScript Promises',
    slug: slugify('Understanding JavaScript Promises', { lower: true }),
    content: sampleContent1,
    excerpt:
      'Learn how to work with Promises in JavaScript and handle asynchronous operations effectively.',
    coverImage:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-01-15'),
    categoryNames: ['tech'],
    tagNames: ['javascript', 'promises', 'async', 'programming'],
  },
  {
    title: 'Getting Started with Next.js',
    slug: slugify('Getting Started with Next.js', { lower: true }),
    content: sampleContent2,
    excerpt:
      'A comprehensive guide to building modern web applications with Next.js and React.',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-02-20'),
    categoryNames: ['tech'],
    tagNames: ['nextjs', 'react', 'webdev', 'frontend'],
  },
  {
    title: 'Building RESTful APIs with Express',
    slug: slugify('Building RESTful APIs with Express', { lower: true }),
    content: sampleContent3,
    excerpt:
      'Master the art of creating scalable RESTful APIs using Express.js and Node.js.',
    coverImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-03-10'),
    categoryNames: ['tech'],
    tagNames: ['express', 'nodejs', 'api', 'backend'],
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Each',
    slug: slugify('CSS Grid vs Flexbox: When to Use Each', { lower: true }),
    content: sampleContent4,
    excerpt:
      'Learn the differences between CSS Grid and Flexbox and when to use each layout system.',
    coverImage:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-04-05'),
    categoryNames: ['tech'],
    tagNames: ['css', 'frontend', 'webdev', 'design'],
  },
  {
    title: 'State Management with Redux',
    slug: slugify('State Management with Redux', { lower: true }),
    content: sampleContent5,
    excerpt:
      'A deep dive into managing application state with Redux and best practices.',
    coverImage:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    status: 'DRAFT' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-05-12'),
    categoryNames: ['tech'],
    tagNames: ['redux', 'react', 'state-management', 'javascript'],
  },

  {
    title: 'Understanding Async/Await in JavaScript',
    slug: slugify('Understanding Async/Await in JavaScript', { lower: true }),
    content: sampleContent6,
    excerpt:
      'Learn how Async/Await simplifies asynchronous programming in JavaScript for cleaner and more readable code.',
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-02-10'),
    categoryNames: ['tech'],
    tagNames: ['javascript', 'async', 'promises', 'programming'],
  },
  {
    title: 'Building REST APIs with Express and Node.js',
    slug: slugify('Building REST APIs with Express and Node.js', {
      lower: true,
    }),
    content: sampleContent7,
    excerpt:
      'A beginner-friendly guide to creating REST APIs using Express and Node.js.',
    coverImage:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-03-18'),
    categoryNames: ['tech'],
    tagNames: ['express', 'nodejs', 'api', 'backend'],
  },
  {
    title: 'Next.js 15 Features You Should Know',
    slug: slugify('Next.js 15 Features You Should Know', { lower: true }),
    content: sampleContent8,
    excerpt:
      'Explore the new features in Next.js 15, including server actions and improved caching.',
    coverImage:
      'https://images.unsplash.com/photo-1581092334425-c6e9b8d20b5a?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-04-05'),
    categoryNames: ['tech'],
    tagNames: ['nextjs', 'react', 'webdev', 'frontend'],
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Each',
    slug: slugify('CSS Grid vs Flexbox: When to Use Each', { lower: true }),
    content: sampleContent9,
    excerpt:
      'Learn the key differences between CSS Grid and Flexbox and when to use each layout system.',
    coverImage:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-05-20'),
    categoryNames: ['tech'],
    tagNames: ['css', 'frontend', 'webdev', 'design'],
  },
  {
    title: 'State Management with Redux',
    slug: slugify('State Management with Redux', { lower: true }),
    content: sampleContent10,
    excerpt:
      'An introduction to managing state in JavaScript apps using Redux Toolkit.',
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-06-01'),
    categoryNames: ['tech'],
    tagNames: ['redux', 'react', 'javascript', 'state-management'],
  },
  {
    title: '10 Lifestyle Habits for Better Productivity',
    slug: slugify('10 Lifestyle Habits for Better Productivity', {
      lower: true,
    }),
    content: sampleContent11,
    excerpt:
      'Simple lifestyle habits that can boost your productivity and focus daily.',
    coverImage:
      'https://images.unsplash.com/photo-1484981138541-3d074aa97716?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-06-22'),
    categoryNames: ['lifestyle'],
    tagNames: ['programming', 'webdev'],
  },
  {
    title: 'Financial Planning for Beginners',
    slug: slugify('Financial Planning for Beginners', { lower: true }),
    content: sampleContent12,
    excerpt:
      'A simple guide to help beginners manage money, save smartly, and plan their financial future.',
    coverImage:
      'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-07-12'),
    categoryNames: ['finance'],
    tagNames: ['education'],
  },
  {
    title: 'Healthy Living: Nutrition and Fitness Tips',
    slug: slugify('Healthy Living: Nutrition and Fitness Tips', {
      lower: true,
    }),
    content: sampleContent13,
    excerpt:
      'Discover practical health and fitness tips to improve your overall wellbeing.',
    coverImage:
      'https://images.unsplash.com/photo-1518611012118-fb9a9033e05a?w=800',
    status: 'PUBLISHED' as BlogStatus,
    authorId: 1,
    publishedAt: new Date('2024-08-10'),
    categoryNames: ['health & fitness'],
    tagNames: ['lifestyle'],
  },
];
