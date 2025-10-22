'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function updateLikes({
  postId,
  slug,
  liked,
}: {
  postId: string;
  slug: string;
  liked: boolean;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    if (liked) {
      // Add like
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
    } else {
      // Remove like
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    }

    revalidatePath(`/articles/${slug}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating like:', error);
    throw error;
  }
}
