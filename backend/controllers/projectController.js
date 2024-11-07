// controllers/projectController.js
import Project from '../models/Project.js'; // Ensure you have this import at the top

export const addProject = async (req, res) => {
  try {
    const { title,price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Allow image to be null

    // Create a new project instance
    const project = new Project({ image, title, description });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error adding project', error });
  }
};

// Function to get all projects from the database
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error });
  }
};
