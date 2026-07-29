export type AuthSessionUser = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
};

export type AuthSessionPayload = {
  user: AuthSessionUser;
  expires: string;
};

const sessions = new Map<string, AuthSessionPayload>();

export function createSession(sessionUser: AuthSessionUser) {
  const token = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const payload: AuthSessionPayload = {
    user: sessionUser,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  };
  sessions.set(token, payload);
  return { token, payload };
}

export function getSessionByToken(token?: string | null) {
  if (!token) {
    return null;
  }

  return sessions.get(token) ?? null;
}

export function destroySession(token?: string | null) {
  if (!token) {
    return;
  }

  sessions.delete(token);
}
