import mongoose from 'mongoose';
import Item from '../models/Item.js';
import path from 'path';
import fs from 'fs';

// Helper function to delete old image files
const deleteImageFiles = (filenames) => {
  filenames.forEach((filename) => {
    const filePath = path.join('./uploads', filename);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting old image:', err);
    });
  });
};

// POST route to add an item
export const addItem = async (req, res) => {
  try {
    if (req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (req.body.title.length < 3) {
      return res.status(400).json({ message: 'Title must be at least 3 characters long' });
    }

    const images = req.files.map((file) => `/uploads/${file.filename}`);
    const { title, price, description, feature, type, language, framework,website, } = req.body;

    const newItem = new Item({
      images,
      title,
      price,
      description,
      feature,
      type,
      language,
      framework,
      website,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item' });
  }
};

// GET route to fetch all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

// GET route to fetch a single item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid item ID format' });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    return res.status(500).json({ message: 'Error fetching item' });
  }
};
// DELETE route to delete an item by ID
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.images && item.images.length > 0) {
      deleteImageFiles(item.images); // Delete images associated with the item
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
};

// PUT route to update an item by ID
export const updateItem = async (req, res) => {
  try {
    const { price, title, description, feature, type, language, framework, website } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update item properties
    item.price = price || item.price;
    item.title = title || item.title;
    item.description = description || item.description;
    item.feature = feature || item.feature;
    item.type = type || item.type;
    item.language = language || item.language;
    item.framework = framework || item.framework;
    item.website = website || item.website;

    // Update images if new images are uploaded
    if (req.files && req.files.length > 0) {
      // Delete old images if they exist
      if (item.images && item.images.length > 0) {
        deleteImageFiles(item.images);
      }

      // Update with new images
      item.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item' });
  }
};
