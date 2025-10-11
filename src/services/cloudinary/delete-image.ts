import { v2 as cloudinary } from 'cloudinary';

export default async function deleteImage(publicId: string) {
  try {
    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    return res;
  } catch (error) {
    throw error;
  }
}
