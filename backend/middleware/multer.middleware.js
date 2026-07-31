import multer from 'multer';

// Storage configuration: Store files in memory buffer for stream upload to Cloudinary
const storage = multer.memoryStorage();

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// File Filter Function
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    const error = new Error(
      'Invalid file type. Only PNG, JPG, JPEG, and WEBP image files are allowed.'
    );
    error.code = 'LIMIT_FILE_TYPES';
    cb(error, false);
  }
};

// Multer Upload Instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB Max File Size
  },
  fileFilter: fileFilter,
});

/**
 * Middleware for handling Company image uploads (Logo and Banner)
 */
export const uploadCompanyImages = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]);

/**
 * Express error handling wrapper for Multer errors
 */
export const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum allowed image size is 5MB.',
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'An error occurred during file upload.',
    });
  }
  next();
};

export default upload;
