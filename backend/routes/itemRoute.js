import express from 'express';
import multer from 'multer';
import Item from '../models/Item.js';
import path from 'path';
import fs from 'fs';

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

// Helper function to delete old image file
const deleteImageFile = (filename) => {
  const filePath = path.join('./uploads', filename);
  fs.unlink(filePath, (err) => {
    if (err) console.error('Error deleting old image:', err);
  });
};

// POST route to add an item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (req.body.title.length < 3) {
      return res.status(400).json({ message: 'Title must be at least 3 characters long' });
    }

    const newItem = new Item({
      image: req.file.filename,
      price: req.body.price,
      title: req.body.title,
      description: req.body.description,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item' });
  }
});


// GET route to fetch all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// DELETE route to delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.image) {
      deleteImageFile(item.image);
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
});


// PUT route to update an item by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { price, title,description } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update item properties
    item.price = price || item.price;
    item.title =title || item.title;
    item.description = description || item.description;

    // Update image if new image is uploaded
    if (req.file) {
      // Delete old image file if it exists
      if (item.image) {
        fs.unlink(`./uploads/${item.image}`, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      item.image = req.file.filename; // Update with new image filename
    }

    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item' });
  }
});


export default router;
