import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

/**
 * Check if Cloudinary credentials are fully configured
 */
export const isCloudinaryConfigured = () => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
};

/**
 * Upload a file buffer to Cloudinary using upload_stream
 * @param {Buffer} fileBuffer - File buffer from Multer memoryStorage
 * @param {string} folder - Target folder in Cloudinary (e.g., 'jobsphere/companies')
 * @returns {Promise<{ url: string, public_id: string }>}
 */
export const uploadToCloudinary = (fileBuffer, folder = 'jobsphere/companies') => {
  return new Promise((resolve, reject) => {
    // Fallback if Cloudinary is not configured in local environment
    if (!isCloudinaryConfigured()) {
      console.warn(
        '⚠️ Cloudinary credentials missing in backend/.env. Using Data URI fallback for development.'
      );
      // Convert buffer to data URI string for seamless local testing without breaking
      const mime = 'image/png'; // base fallback
      const base64 = fileBuffer.toString('base64');
      const dataUri = `data:${mime};base64,${base64}`;
      return resolve({
        url: dataUri,
        public_id: `fallback_${Date.now()}`,
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        resolve({
          url: result.secure_url || result.url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete an image from Cloudinary by its public ID
 * @param {string} publicId - Cloudinary asset public ID
 * @returns {Promise<any>}
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId || publicId.startsWith('fallback_') || !isCloudinaryConfigured()) {
    return null;
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.warn(`Failed to delete asset ${publicId} from Cloudinary:`, error.message);
    return null;
  }
};

export default cloudinary;
