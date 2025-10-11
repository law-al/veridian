import { NextRequest } from 'next/server';
import uploadImages from '@/services/cloudinary/upload-image';

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

    return new Response(
      JSON.stringify({ public_id: result.public_id, url: result.secure_url }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(`Upload image failed: ${error}`);
    return new Response(JSON.stringify({ error: 'Upload image failed' }), {
      status: 400,
    });
  }
}
