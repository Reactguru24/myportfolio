// src/components/Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ label, onClick, className }) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
