import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Travel Planner</h1>
      <nav>
        <Link to="/form">Create Travel Plan</Link> |{' '}
        <Link to="/recommendations">Browse Recommendations</Link>
      </nav>
    </div>
  );
}

export default HomePage;
