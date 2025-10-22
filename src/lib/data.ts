import { Prisma, UserRole, Subscription } from '@/generated/prisma';
import { prisma } from './prisma';
import { clerkClient, UserJSON, auth } from '@clerk/nextjs/server';
import { generateRandomString } from './utils';

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

type PostResult = Prisma.PostGetPayload<{
  include: { likes: true; comments: true };
}>;
type UserResult = Prisma.UserGetPayload<{}>;

/**
 * This TypeScript function retrieves articles based on search criteria, order, and pagination,
 * handling different sorting options like newest, oldest, most liked, and most commented.
 * @param {string} search - The `search` parameter is a string that represents the keyword or phrase
 * that the user is searching for in the articles. This search term will be used to filter the articles
 * based on their title, excerpt, or tags.
 * @param {Order} order - The `order` parameter in the `getArticles` function determines the order in
 * which the articles will be sorted and displayed. The possible values for the `order` parameter are:
 * @param {string} pages - The `pages` parameter in the `getArticles` function is used to determine
 * which page of articles to retrieve. It specifies the page number that the user wants to view. If no
 * specific page number is provided, it defaults to the first page (page 1).
 * @returns The `getArticles` function returns a Promise that resolves to an array of `PostResult`
 * objects, which represent articles/posts fetched based on the provided search query, order criteria,
 * and pagination settings.
 */
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
            tags: { some: { name: { contains: search, mode: 'insensitive' } } },
          },
        ],
      },
      include: {
        likes: true,
        comments: true,
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

export async function getAritcle(slug: string) {
  try {
    const { userId } = await auth();
    const article = await prisma.post.findFirst({
      where: { slug },

      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        author: true,
        likes: userId
          ? {
              where: {
                userId: userId,
              },
              select: { id: true },
            }
          : false,
        comments: true,
      },
    });

    if (!article) return null;

    return {
      ...article,
      likesCount: article._count.likes,
      isLikedByUser: article.likes && article.likes.length > 0,
    };
  } catch (error) {
    console.error('Error', error);
    throw new Error('Failed to fetch post');
  }
}

/**
 * This TypeScript function retrieves the total count of published posts based on a search query using
 * Prisma.
 * @param {string} search - The `getTotalPost` function you provided is an asynchronous function that
 * retrieves the total count of published posts based on the search criteria provided. The function
 * uses Prisma to query the database for posts that match the search term in either the title, excerpt,
 * or tags.
 * @returns The `getTotalPost` function returns a Promise that resolves to a number representing the
 * total count of posts that match the search criteria specified in the function parameter.
 */
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
                tags: {
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

/**
 * The function `addUserToDb` adds a user to a database based on provided JSON data, checking for
 * existing users and returning success or error messages accordingly.
 * @param  - The `addUserToDb` function is an asynchronous function that takes an object as a parameter
 * with a `data` property containing a `UserJSON` object. The function returns a Promise that resolves
 * to an object with three properties: `success` indicating if the operation was successful, `data`
 * @returns The function `addUserToDb` returns a Promise that resolves to an object with the following
 * properties:
 * - `success`: A boolean indicating whether the operation was successful.
 * - `data`: Either the created user data (of type `Prisma.UserCreateInput`), `null`, or `undefined`.
 * - `message`: A string message describing the outcome of the operation.
 */
export async function addUserToDb({ data }: { data: UserJSON }): Promise<{
  success: boolean;
  data: Prisma.UserCreateInput | null | undefined;
  message: string;
}> {
  try {
    if (!data) throw new Error('No JSON data provided');

    // Get the primary email
    const primaryEmail = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id
    );

    if (!primaryEmail) {
      throw new Error('No primary email address found');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: data.id,
      },
    });

    // If user exists, return success
    if (existingUser) {
      return {
        success: true,
        data: null,
        message: 'User already exists',
      };
    }

    const generateUsername = (): string => {
      if (!data.username) {
        return `user_${generateRandomString(8)}`;
      } else {
        return data.username;
      }
    };

    // Create new user
    const userdata = await prisma.user.create({
      data: {
        clerkId: data.id,
        email: primaryEmail.email_address,
        username: generateUsername(),
        bio: '',
        role: 'READER',
        subscribed: false,
        subscription: 'FREE',
        image: data.image_url || null,
      },
    });

    console.log(userdata);

    return {
      success: true,
      data: userdata,
      message: 'User created successfully',
    };
  } catch (error) {
    console.error('Error adding user to DB:', error);
    return {
      success: false,
      data: null,
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * The function `getUser` retrieves a user's information based on the provided userId or from
 * authentication if no userId is provided.
 * @param {string | null} [userId] - The `userId` parameter in the `getUser` function is optional and
 * can be either a string or `null`. If a `userId` is not provided, the function will attempt to
 * retrieve it from the `auth()` function.
 * @returns The `getUser` function returns a Promise that resolves to a `UserResult` object or `null`.
 */
export async function getUser(
  userId?: string | null
): Promise<UserResult | null> {
  try {
    // If no userId provided, get from auth
    const clerkUserId = userId || (await auth()).userId;

    if (!clerkUserId) return null;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkUserId,
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * The function `updateClerkMetaData` updates the metadata of a Clerk user with specified parameters
 * and returns a success message or error message accordingly.
 * @param  - The `updateClerkMetaData` function is an asynchronous function that updates metadata for a
 * Clerk user. It takes an object as a parameter with the following properties:
 * @returns The `updateClerkMetaData` function returns a Promise that resolves to an object with the
 * following structure:
 * ```typescript
 * {
 *   success: boolean,
 *   message: string,
 *   data: number | string | null
 * }
 * ```
 * The `success` field indicates whether the operation was successful or not. The `message` field
 * provides a descriptive message about the outcome of the operation. The `
 */
export async function updateClerkMetaData({
  clerkId,
  subscribed = false,
  role = 'READER',
  subscription = 'FREE',
}: {
  clerkId: string;
  subscribed?: boolean;
  role?: UserRole;
  subscription?: Subscription;
}): Promise<{
  success: boolean;
  message: string;
  data: number | string | null;
}> {
  try {
    const client = await clerkClient();
    const response = await client.users.updateUserMetadata(clerkId, {
      publicMetadata: {
        subscribed,
        role,
        subscription,
      },
    });

    if (response.id) {
      return {
        success: true,
        message: 'Clerk metadata updated successfully',
        data: response.id,
      };
    }

    throw new Error('Failed to update Clerk metadata');
  } catch (error) {
    console.error('Error updating Clerk metadata:', error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
      data: null,
    };
  }
}
