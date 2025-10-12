import { z } from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(2, { error: 'A title of min character 2 is required' })
    .max(50),
  shortDescription: z
    .string()
    .min(10, {
      message: 'A short description must be at least 10 characters.',
    })
    .max(200, {
      message: 'A short description not be longer than 30 characters.',
    }),
  category: z.string({ error: 'A category is required' }),
});
