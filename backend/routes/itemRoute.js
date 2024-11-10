import express from 'express';
import multer from 'multer';
import path from 'path';
import { addItem, getItems, deleteItem, updateItem ,getItemById} from '../controllers/itemsController.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route to add an item
router.post('/', upload.array('images', 5), addItem);

// GET route to fetch all items
router.get('/', getItems);

router.get('/:id', getItemById);

// DELETE route to delete an item by ID
router.delete('/:id', deleteItem);

// PUT route to update an item by ID
router.put('/:id', upload.array('images', 5), updateItem);

export default router;
