import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admins.js'; // Import Admin model
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

// Register a new admin user
router.post('/admin/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin user already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new admin user
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin user', error });
  }
});

// Sign in an admin user
router.post('/admin/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin user exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({ message: 'Sign in successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error });
  }
});

export default router;
