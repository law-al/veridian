import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_SIGNATURE,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '@/lib/secret';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default async function uploadImages(
  file: File,
  folder: string,
  publicId: string
) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          public_id: publicId,
          transformation: [
            {
              width: 1200,
              crop: 'limit',
              quality: 'auto:best',
              fetch_format: 'auto',
            },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      );

      uploadStream.end(buffer);
    });

    return result;
  } catch (error) {
    throw error;
  }
}
