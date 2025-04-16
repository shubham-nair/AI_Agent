import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Travel Planner</h1>
      <p className="subtitle">Plan your perfect trip with AI-powered recommendations</p>
      <Link to="/form" className="cta-button">
        Start Planning Your Trip →
      </Link>
    </div>
  );
}

export default HomePage;
