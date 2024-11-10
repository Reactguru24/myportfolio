import React from 'react';
import { FaLinkedin, FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './SocialMediaLinks.css';

const SocialMediaLinks = () => (
  <div className="social-media">
    <a href="https://linkedin.com" aria-label="LinkedIn">
      <FaLinkedin />
    </a>
    <a href="https://facebook.com" aria-label="Facebook">
      <FaFacebook />
    </a>
    <a href="https://whatsapp.com" aria-label="WhatsApp">
      <FaWhatsapp />
    </a>
    <a href="https://instagram.com" aria-label="Instagram">
      <FaInstagram />
    </a>
  </div>
);

export default SocialMediaLinks;
