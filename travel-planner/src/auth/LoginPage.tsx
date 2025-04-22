import { useLocation, useNavigate } from 'react-router-dom';
import FirebaseAuth from './FirebaseAuth';
import { useAuth } from './useAuth';
import { useEffect } from 'react';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to My Plans
    if (auth.user) {
      const from = (location.state as any)?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    }
  }, [auth.user, navigate, location]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Travel Planner</h1>
        <FirebaseAuth />
      </div>
    </div>
  );
}
