import { NextRequest } from 'next/server';
import uploadImages from '@/services/cloudinary/upload-image';
import deleteImage from '@/services/cloudinary/delete-image';
import { saveBlogImage } from '@/services/blog/save-blog-editor-image';
import { prisma } from '@/lib/prisma';

let user: { id: number; username: string } = {
  id: 1,
  username: 'lawfem',
};

export async function POST(request: NextRequest) {
  if (!user?.id)
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    const cloudinaryPublicId = `${user.username}_${new Date()
      .toISOString()
      .replace(/[:.]/g, '-')}`;
    const cloudinaryFolder = `veridan-blog/${user.username}/editor-image`;

    if (!file)
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 400,
      });

    const result = await uploadImages(
      file,
      cloudinaryFolder,
      cloudinaryPublicId
    );

    if (result) {
      await saveBlogImage(user.id, cloudinaryPublicId, cloudinaryFolder);
    }

    return new Response(
      JSON.stringify({ public_id: result.public_id, url: result.secure_url }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(`Upload image failed: ${error}`);
    return new Response(JSON.stringify({ error: 'Upload image failed' }), {
      status: 400,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const { publicId } = await request.json();

  try {
    const res = await deleteImage(publicId);

    if (!res) return;

    await prisma.blogImages.updateMany({
      where: {
        publicId: publicId,
        userId: user.id,
      },
      data: {
        status: 'NOT_IN_USE',
      },
    });

    return new Response(JSON.stringify({ message: 'image deleted' }), {
      status: 200,
    });
  } catch (error) {
    console.log(`Delete image failed: ${error}`);
    return new Response(JSON.stringify({ error: 'Delete image failed' }), {
      status: 400,
    });
  }
}
