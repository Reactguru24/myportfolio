// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the admin is logged in by checking localStorage for the token
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      // Optionally, decode the token to get the email (if using JWT)
      // Example: const decodedToken = jwt.decode(token);
      // setEmail(decodedToken.email);
      setEmail('kelviwalanda@gmail.com'); // For now, using a static email
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setEmail('');
    navigate('/login'); // Redirect to login page after successful logout
  };

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  return (
    <div
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '>' : '<'}
      </button>
      <h2 className={`sidebar-header ${isCollapsed ? 'collapsed' : ''}`}>
        Admin Panel
      </h2>
      <ul className="sidebar-menu">
        <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={`menu-item ${location.pathname === '/items' ? 'active' : ''}`}>
          <Link to="/items">Items</Link>
        </li>
        <li className={`menu-item ${location.pathname === '/settings' ? 'active' : ''}`}>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>

      {/* Admin Email and Sign-Out Icon */}
      {isLoggedIn && (
        <div className="sidebar-footer">
          <p>{email}</p>
          <div className="sidebar-signout" onClick={handleLogout}>
            <FaSignOutAlt size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
