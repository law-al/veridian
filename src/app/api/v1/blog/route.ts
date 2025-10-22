import { blogFormSchema } from '@/schema';
import uploadImages from '@/services/cloudinary/upload-image';
import { NextResponse } from 'next/server';
import slugify from 'slugify';
import {
  addPostToDb,
  getCategoryFromdb,
  getTagsFromDb,
} from '@/services/database/blog.db';
import { asyncHandler } from '@/lib/async-handler';
import { purifyHtml } from '@/lib/utils';
purifyHtml

const user = {
  id: 1,
  username: 'lawfem',
};

export const POST = asyncHandler(async (request) => {
  const formData = await request.formData();

  const rawData = {
    file: formData.get('file') as File,
    title: formData.get('title') as string,
    desc: formData.get('desc') as string,
    category: formData.get('category') as string,
    tags: formData.get('tags') as string,
    markdownHTML: formData.get('markdownJSON') as string,
  };

  const parsedData = blogFormSchema.parse(rawData);
  const cloudinaryPublicId = `${user.username}_${new Date()
    .toISOString()
    .replace(/[:.]/g, '-')}`;
  const cloudinaryFolder = `veridan-blog/${user.username}/cover-image`;

  const { secure_url: coverImage } = await uploadImages(
    parsedData.file,
    cloudinaryFolder,
    cloudinaryPublicId
  );

  const markdownHTML = purifyHtml(parsedData.markdownHTML);
  const tags = await getTagsFromDb(parsedData.tags);
  const categoryId = await getCategoryFromdb(parsedData.category);
  await addPostToDb({
    userId: user.id,
    categoryId,
    content: markdownHTML,
    coverImage,
    excerpt: parsedData.desc,
    publishedAt: new Date(),
    slug: slugify(parsedData.title, { lower: true }),
    title: parsedData.title,
    tags,
  });

  return NextResponse.json(
    { status: 'success', message: 'Blog post created successfully' },
    { status: 201 }
  );
});
