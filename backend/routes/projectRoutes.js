// routes/projectRoutes.js
import express from 'express';
import { addProject, getProjects } from '../controllers/projectController.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current file's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the uploads directory
const uploadsDir = join(__dirname, '..', 'uploads');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Set the destination for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename
  }
});

const upload = multer({ storage }); // Create the multer instance

const router = express.Router();

// POST /api/projects - Add a new project with image upload
router.post('/', upload.single('image'), addProject);

// GET /api/projects - Get all projects
router.get('/', getProjects);

export default router;
