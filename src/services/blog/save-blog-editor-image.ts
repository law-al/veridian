import { prisma } from '@/lib/prisma';

export async function saveBlogImage(
  userId: number,
  publicId: string,
  url: string
) {
  return prisma.blogImage.create({
    data: {
      userId,
      publicId,
      url,
    },
  });
}
