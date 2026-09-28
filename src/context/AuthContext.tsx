import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { loginUser, registerUser } from '../api/auth';
import { type User } from '../lib/types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('jobap_user');
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (token: string, u: User) => {
    localStorage.setItem('jobap_token', token);
    localStorage.setItem('jobap_user', JSON.stringify(u));
    setUser(u);
  };

  const login = useCallback(async (username: string, password: string) => {
    const res = await loginUser(username, password);
    persist(res.accessToken, res.user);
  }, []);

  const register = useCallback(
    async (email: string, password: string, username: string) => {
      const res = await registerUser(email, password, username);
      persist(res.accessToken, res.user);
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('jobap_token');
    localStorage.removeItem('jobap_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
