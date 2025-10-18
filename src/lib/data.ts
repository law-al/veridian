import { Prisma } from '@/generated/prisma';
import { prisma } from './prisma';

type Order = 'newest' | 'oldest' | 'most_liked' | 'most_commented' | undefined;

type SortDirection = 'asc' | 'desc';

type ScalarSort = {
  publishedAt?: SortDirection;
  views?: SortDirection;
  title?: SortDirection;
};

type RelationCountSort = {
  like?: { _count: SortDirection };
  comment?: { _count: SortDirection };
};

type PostSortInput = ScalarSort & RelationCountSort;

type PostResult = Prisma.PostGetPayload<{}>;

export async function getArticles(
  search: string,
  order: Order,
  pages: string
): Promise<PostResult[]> {
  try {
    const getOrderFilter = (): PostSortInput => {
      switch (order) {
        case 'newest':
          return { publishedAt: 'desc' };
        case 'oldest':
          return { publishedAt: 'asc' };
        case 'most_liked':
          return { like: { _count: 'desc' } };
        case 'most_commented':
          return { comment: { _count: 'desc' } };
        default:
          return { publishedAt: 'desc' };
      }
    };

    const articlePage = +pages || 1;
    const take = 6;
    const skip = (articlePage - 1) * take;

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { excerpt: { contains: search, mode: 'insensitive' } },
          {
            tag: { some: { name: { contains: search, mode: 'insensitive' } } },
          },
        ],
      },
      orderBy: getOrderFilter(),
      take,
      skip,
    });

    return posts;
  } catch (error) {
    console.error('An error occured', error);
    throw new Error('Failed to fetch post');
  }
}

export async function getTotalPost(search: string): Promise<number> {
  try {
    const totalPostCount = await prisma.post.count({
      where: {
        AND: [
          { status: 'PUBLISHED' },
          {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { excerpt: { contains: search, mode: 'insensitive' } },
              {
                tag: {
                  some: { name: { contains: search, mode: 'insensitive' } },
                },
              },
            ],
          },
        ],
      },
    });

    return totalPostCount;
  } catch (error) {
    console.error('An error occured', error);
    throw new Error('Failed to fetch post counts');
  }
}
