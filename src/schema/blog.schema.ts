import { z } from 'zod';

export const blogFormSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Cover image file is required'),

  title: z
    .string({ error: 'Title is required' })
    .min(3, 'Title must be at least 3 characters long'),

  desc: z
    .string({ error: 'Description is required' })
    .min(10, 'Description must be at least 10 characters long'),

  category: z
    .string({ error: 'Category is required' })
    .min(1, 'Category is required'),

  tags: z.string().transform((val) => {
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) throw new Error('Tags must be an array');
      return parsed as string[];
    } catch {
      throw new Error('Invalid tags format');
    }
  }),

  markdownHTML: z
    .string({ error: 'Markdown content is required' })
    .min(1, 'Markdown content cannot be empty'),
});
