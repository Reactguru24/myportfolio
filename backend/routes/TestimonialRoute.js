import express from 'express';
import { getTestimonials, addTestimonial } from '../controllers/testimonialsController.js';

const router = express.Router();

router.get('/', getTestimonials); // Updated the route to use '/'
router.post('/', addTestimonial);

export default router;
