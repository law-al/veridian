import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { blogFormSchema } from '@/schema';
import slugify from 'slugify';
import { z } from 'zod';

interface AddPostToDb {
  userId: number;
  content: string;
  categoryId: string;
  coverImage: string;
  excerpt: string;
  publishedAt: Date;
  slug: string;
  title: string;
  tags: Prisma.TagCreateInput[];
}

export const getTagsFromDb = async (
  tags: string[]
): Promise<Prisma.TagCreateInput[]> => {
  if (tags.length < 1) throw new Error('A Category must be provided');

  const results = await Promise.all(
    tags.map(async (tag) => {
      const trimmed = tag.trim();
      const slug = slugify(trimmed, { lower: true });

      return prisma.tag.upsert({
        where: { slug },
        update: {},
        create: { name: trimmed, slug },
      });
    })
  );

  return results;
};

export const getCategoryFromdb = async (category: string): Promise<string> => {
  if (!category) throw new Error('A Category must be provided');

  const result = await prisma.category.findFirst({
    where: {
      name: category,
    },
  });

  if (!result) throw new Error('Category not found');

  return result.id;
};

export const addPostToDb = async ({
  userId,
  content,
  categoryId,
  coverImage,
  excerpt,
  publishedAt,
  slug,
  title,
  tags,
}: AddPostToDb) => {
  // prettier-ignore
  if (!tags || tags.length < 1)
    throw new Error('Tags is required')

  // prettier-ignore
  if (!coverImage)
    throw new Error('Cover image is required')

  await prisma.post.create({
    data: {
      authorId: userId,
      content,
      category: {
        connect: [{ id: categoryId }],
      },
      coverImage,
      status: 'PUBLISHED',
      excerpt,
      publishedAt,
      slug,
      title,
      tag: {
        connect: tags.map((tag) => ({ id: tag.id })),
      },
    },
  });
};
