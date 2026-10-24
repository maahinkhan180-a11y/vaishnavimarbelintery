import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext, type AdminSession } from './authContextState';

async function authRequest<T>(path: string, body?: Record<string, string>) {
  const response = await fetch(path, {
    method: body ? 'POST' : 'GET',
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(result.error || 'Authentication request failed');
  return result;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authRequest<{ authenticated: boolean; email: string | null }>('/api/auth/session')
      .then(result => setSession(result.authenticated && result.email ? { email: result.email } : null))
      .catch(error => {
        console.error('Could not check admin session:', error);
        setSession(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authRequest<{ email: string }>('/api/auth/login', { email, password });
      setSession({ email: result.email });
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Sign-in failed' };
    }
  };

  const signOut = async () => {
    try {
      await authRequest<{ authenticated: false }>('/api/auth/logout', {});
      setSession(null);
    } catch (error) {
      console.error('Could not sign out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
