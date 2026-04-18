import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchWithAuth } from '../lib/api';

// We adjust User to our Spring Boot backend model locally.
export interface User {
  email: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (username: string, email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isNewUser: boolean;
  setIsNewUser: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Attempt to load from localStorage
    const savedToken = sessionStorage.getItem('token');
    const savedEmail = sessionStorage.getItem('userEmail');
    if (savedToken && savedEmail) {
      setToken(savedToken);
      setUser({ email: savedEmail });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (response && response.token) {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userEmail', email);
        setToken(response.token);
        setUser({ email });
        return { error: null };
      } else {
        return { error: "Login failed" };
      }
    } catch (error: any) {
      return { error: error.message || 'Login failed' };
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      await fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });
      setIsNewUser(true);
      return { error: null };
    } catch (error: any) {
      return { error: error.message || 'Registration failed' };
    }
  };

  const signOut = async () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEmail');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut, isNewUser, setIsNewUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
