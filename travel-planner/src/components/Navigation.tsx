import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="nav-link">
          {isHomePage ? 'Travel Planner' : '← Back to Home'}
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/recommendations" className="nav-link">Recommendations</Link>
        <Link to="/profile" className="nav-link">My Plans</Link>
      </div>  
      <div className="auth-links">
        <Link to="/login" className="nav-link">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navigation; 