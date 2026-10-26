import { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '@/lib/api';

interface AuthContextValue {
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await api.login(email, password);
      if (result?.token) {
        localStorage.setItem('auth_token', result.token);
        setSession({ user: result.user ?? { email } });
        setLoading(false);
        return { error: null };
      }
      return { error: result?.message || 'Login failed' };
    } catch (error: any) {
      return { error: error?.message || 'Login failed' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('auth_token');
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
