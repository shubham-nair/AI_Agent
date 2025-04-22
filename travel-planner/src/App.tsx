import React from 'react';
import AppRoutes from './routes';
import Navigation from './components/Navigation';
import './styles/global.css';
// import LoginPage from './auth/LoginPage';
// import { useAuth } from './auth/useAuth';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
