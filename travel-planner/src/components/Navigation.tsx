import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import '../styles/Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  const handleMyPlansClick = (e: React.MouseEvent) => {
    if (!auth.user) {
      e.preventDefault();
      navigate('/login', { state: { from: '/profile' } });
    }
  };

  const getUserDisplayName = () => {
    if (!auth.user) return '';
    return auth.user.displayName || auth.user.email || 'User';
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="nav-link">
          {isHomePage ? 'Travel Planner' : '← Back to Home'}
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/recommendations" className="nav-link">Recommendations</Link>
        <Link 
          to="/profile" 
          className="nav-link"
          onClick={handleMyPlansClick}
        >
          My Plans
        </Link>
      </div>  
      <div className="auth-links">
        {auth.user ? (
          <div className="user-profile">
            <span className="username">{getUserDisplayName()}</span>
            <button onClick={handleLogout} className="nav-button">
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 