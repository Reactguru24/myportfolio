import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/TestimonialRoute.js';
import itemRoutes from './routes/itemRoute.js'; // Import the item routes
import cors from 'cors';  // Make sure this is imported
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
app.use(cors({ 
    origin: '*', // Update as needed to restrict origins
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
    preflightContinue: true, // Continue preflight requests
    optionsSuccessStatus: 204, // Successful OPTIONS response for legacy browsers
}));

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join('uploads')));

// Register routes
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/items', itemRoutes); 
app.use('/api', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
