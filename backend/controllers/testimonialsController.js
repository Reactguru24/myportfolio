// controllers/testimonialsController.js
import Testimonial from '../models/Testimonial.js';

// Fetch all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ date: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching testimonials' });
  }
};

// Add a new testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { avatar, name, message } = req.body;
    const newTestimonial = new Testimonial({ avatar, name, message });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ error: 'Error saving testimonial' });
  }
};
