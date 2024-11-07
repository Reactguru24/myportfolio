import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.webp';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <img className="logo" src={logo} alt="Logo" />

      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Overlay for full-screen effect */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      {/* Sidebar Menu */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#home" onClick={toggleMenu}>Home</a></li>
        <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
        <li><a href="#testimonials" onClick={toggleMenu}>Testimonials</a></li>
        <li><a href="#footer" onClick={toggleMenu}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
