'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type SessionUser = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
};

type AppSession = {
  user: SessionUser;
  expires: string;
} | null;

type AuthContextValue = {
  session: AppSession;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  signIn: (credentials: { identity: string; password: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateSession: (nextSession: AppSession) => void;
};

const STORAGE_KEY = 'inzu-auth-session-v1';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function buildDisplayName(name: string | null | undefined, email: string | null | undefined) {
  if (name && name.trim()) {
    return name.trim();
  }

  if (email && email.trim()) {
    return email.trim();
  }

  return 'Guest';
}

function getNameParts(name: string | null | undefined) {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { firstName: '', lastName: '' };
  }

  const parts = trimmed.split(/\s+/);
  const firstName = parts.shift() || '';
  const lastName = parts.join(' ');
  return { firstName, lastName };
}

function normalizeSessionUser(payload: any): SessionUser | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const email = typeof payload.email === 'string' ? payload.email : '';
  const name = typeof payload.name === 'string' ? payload.name : '';
  const firstNameFromPayload = typeof payload.firstName === 'string' ? payload.firstName : '';
  const lastNameFromPayload = typeof payload.lastName === 'string' ? payload.lastName : '';
  const { firstName, lastName } = getNameParts(firstNameFromPayload || name);

  return {
    id: typeof payload.id === 'string' ? payload.id : typeof payload.sub === 'string' ? payload.sub : 'guest',
    firstName: firstNameFromPayload || firstName,
    lastName: lastNameFromPayload || lastName,
    name: buildDisplayName(name || `${firstName} ${lastName}`.trim(), email),
    email,
    image: typeof payload.image === 'string' ? payload.image : null,
    phone: typeof payload.phone === 'string' ? payload.phone : null,
  };
}

function readStoredSession(): AppSession {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as AppSession;
    if (!parsed?.user) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AppSession>(() => readStoredSession());
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>(() => {
    const stored = readStoredSession();
    return stored ? 'authenticated' : 'unauthenticated';
  });

  useEffect(() => {
    let active = true;

    const hydrateSession = async () => {
      try {
        const storedSession = readStoredSession();
        setSession(storedSession);
        setStatus(storedSession ? 'authenticated' : 'unauthenticated');
      } catch {
        setSession(null);
        setStatus('unauthenticated');
      }
    };

    void hydrateSession();

    return () => {
      active = false;
    };
  }, []);

  const updateSession = useCallback((nextSession: AppSession) => {
    setSession(nextSession);
    setStatus(nextSession ? 'authenticated' : 'unauthenticated');

    if (typeof window !== 'undefined') {
      if (nextSession) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const signIn = useCallback(async ({ identity, password }: { identity: string; password: string }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, password }),
      });

      const payload = await response.json();
      if (!response.ok) {
        return false;
      }

      const normalizedUser = normalizeSessionUser(payload?.user);
      if (!normalizedUser) {
        return false;
      }

      updateSession({
        user: normalizedUser,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      });

      return true;
    } catch {
      return false;
    }
  }, [updateSession]);

  const signOut = useCallback(async () => {
    updateSession(null);
  }, [updateSession]);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    status,
    signIn,
    signOut,
    updateSession,
  }), [session, status, signIn, signOut, updateSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthSession must be used within AuthSessionProvider');
  }

  return context;
}
