'use server';

import { blogFormSchema } from '@/schema';
import uploadImages from '@/services/cloudinary/upload-image';
import {
  addPostToDb,
  getCategoryFromdb,
  getTagsFromDb,
} from '@/services/database/blog.db';
import slugify from 'slugify';
import { revalidatePath } from 'next/cache';
import { purifyHtml } from '../utils';

export type ActionState = {
  success: boolean;
  message: string;
  slug?: string;
  error?: string;
} | null;

const user = {
  id: 1,
  username: 'lawfem',
};

/**
 * The function `addPostToDB` handles the process of adding a new blog post to a database with error
 * handling and validation.
 * @param {ActionState} prevState - `prevState` is the previous state of the application before adding
 * a new blog post to the database. It likely contains information about the current state of the
 * application or any data related to blog posts that are already present.
 * @param {FormData} formData - The `formData` parameter in the `addPostToDB` function contains the
 * data submitted from a form when creating a new blog post. It includes the following fields:
 * @returns The function `addPostToDB` returns a Promise that resolves to an `ActionState` object. This
 * object contains the following properties:
 * - `success`: A boolean indicating whether the operation was successful or not.
 * - `message`: A string message describing the outcome of the operation.
 * - `slug`: A string representing the slug of the blog post created (if successful).
 * - `error`: A
 */
export async function addPostToDB(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const rawData = {
      file: formData.get('file') as File,
      title: formData.get('title') as string,
      desc: formData.get('desc') as string,
      category: formData.get('category') as string,
      tags: formData.get('tags') as string,
      markdownHTML: formData.get('markdownJSON') as string,
    };

    const validatedData = blogFormSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Failed to create blog post',
        error: 'Something went wrong, please try again',
      };
    }

    const { category, desc, file, markdownHTML, tags, title } =
      validatedData.data;

    // prettier-ignore
    const cloudinaryPublicId = `${user.username}_${new Date().toISOString().replace(/[:.]/g, '-')}`;
    const cloudinaryFolder = `veridan-blog/${user.username}/cover-image`;

    // prettier-ignore
    const { secure_url: coverImage } = await uploadImages(file, cloudinaryFolder, cloudinaryPublicId);
    const tagsResult = await getTagsFromDb(tags);
    const categoryId = await getCategoryFromdb(category);

    await addPostToDb({
      userId: user.id,
      categoryId,
      content: purifyHtml(markdownHTML),
      coverImage,
      excerpt: desc,
      publishedAt: new Date(),
      slug: slugify(title, { lower: true }),
      title: title,
      tags: tagsResult,
    });

    revalidatePath('/blog');

    return {
      success: true,
      message: 'Blog created successfully',
      slug: slugify(title, { lower: true }),
    };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return {
      success: false,
      message: 'Failed to create blog post',
      error:
        error instanceof Error ? error.message : 'Failed to create blog post',
    };
  }
}
