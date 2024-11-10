import multer from 'multer';
import path from 'path';

// Set up the storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

// Create the multer upload instance
const upload = multer({ storage });

// Export for use in routes
export default upload;
