import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  images: {
    type: [String],  
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  feature: {
    type: String,   
    required: true,
  },
  type: {
    type: String,   
    required: true,
  },
  language: {
    type: String,   
    required: true,
  },
  framework: {
    type: String, 
    required: true,
  },
  website:{
    type: String,
    required:true
  }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item;
