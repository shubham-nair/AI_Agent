import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="navigation">
      <div className="nav-brand">
        {!isHomePage && (
          <Link to="/" className="nav-link">
            ← Back to Home
          </Link>
        )}
      </div>
      <div className="nav-links">
        <Link to="/recommendations" className="nav-link">Recommendations</Link>
        <Link to="/profile" className="nav-link">My Plans</Link>
      </div>
    </nav>
  );
};

export default Navigation; 