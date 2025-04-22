import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContext {
  user: User | null;
  logout: () => Promise<void>;
}

export function useAuth(): AuthContext {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize with the current user if available
    return auth.currentUser;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { user, logout };
}
