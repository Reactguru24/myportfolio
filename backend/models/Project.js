// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false, // Allow image to be optional
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});


const Project = mongoose.model('Project', projectSchema);

export default Project;
