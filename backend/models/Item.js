import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Include timestamps for createdAt and updatedAt fields

const Item = mongoose.model('Item', itemSchema);

export default Item;
