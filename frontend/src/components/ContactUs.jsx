// src/components/ContactUs.jsx
import React from 'react';
import './ContactUs.css';

const ContactUs = () => (
  <div className="contact-us">
    <h2>Contact Us</h2>
    <div className="contact-details">
      <p><strong>Email:</strong> kelviwalanda@gmail.com</p>
      <p><strong>Phone:</strong> 0743664765</p>
      <p>
        <strong>Follow us:</strong>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
    </div>
  </div>
);

export default ContactUs;
