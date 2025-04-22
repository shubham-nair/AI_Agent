import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  const getUserDisplayName = () => {
    if (!auth.user) return '';
    return auth.user.displayName || auth.user.email || 'User';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Travel Planner
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-item">
            Home
          </Link>
          <Link to="/recommendations" className="nav-item">
            Recommendations
          </Link>
          {auth.user && (
            <Link to="/profile" className="nav-item">
              My Plans
            </Link>
          )}
        </div>
        <div className="nav-buttons">
          {auth.user ? (
            <div className="user-profile">
              <span className="username">{getUserDisplayName()}</span>
              <button onClick={handleLogout} className="nav-button">
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-button">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 