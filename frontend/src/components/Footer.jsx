// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import SocialMediaLinks from './SocialMediaLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id='footer'>
        <SocialMediaLinks />
      <p>© {currentYear} kelvin walanda <br />Software Developer <br />portfolio</p>
      
    </footer>
  );
};

export default Footer;

