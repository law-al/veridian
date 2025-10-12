import { prisma } from '@/lib/prisma';
import uploadImages from '@/services/cloudinary/upload-image';
import { NextRequest } from 'next/server';

let user: { id: number; username: string } = {
  id: 1,
  username: 'lawfem',
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const coverImageFile = formData.get('file') as File | null;
  const blogTitle = formData.get('title') as string | null;
  const blogDesc = formData.get('desc') as string | null;
  const blogCategory = formData.get('category') as string | null;
  const tags = formData.get('tags') as string | null;
  const markdownJSON = formData.get('markdownJSON') as string | null;

  console.log(coverImageFile);

  if (!coverImageFile) {
    return Response.json(
      {
        status: 'fail',
        message: 'A cover image should be provided',
      },
      { status: 400 }
    );
  }
  const cloudinaryPublicId = `${user.username}_${new Date()
    .toISOString()
    .replace(/[:.]/g, '-')}`;
  const cloudinaryFolder = `veridan-blog/${user.username}/cover-image`;

  const result = await uploadImages(
    coverImageFile,
    cloudinaryFolder,
    cloudinaryPublicId
  );

  // await prisma.post.create({
  //   data: {
  //     authorId: user.id,
  //     categoryId: blogCategory || 'Not present',
  //     content: JSON.parse(markdownJSON || 'Not present'),
  //     coverImage: result.secure_url,
  //     excerpt: blogDesc || 'Not present',
  //     publishedAt: new Date(),
  //     slug: blogTitle?.split(' ').join('-') || 'Not present',
  //     title: blogTitle || 'Not present',
  //   },
  // });

  return Response.json(
    {
      status: 'success',
      message: 'Blog post created successfully',
      data: {
        coverImage: result,
        title: blogTitle,
        description: blogDesc,
        category: blogCategory,
        tags: tags,
      },
    },
    { status: 201 }
  );
}
