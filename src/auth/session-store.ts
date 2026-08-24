import crypto from 'node:crypto';

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

const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24 * 7;

function sessionSecret() {
  return process.env.NEXTAUTH_SECRET || 'development-only-session-secret';
}

function sign(value: string) {
  return crypto.createHmac('sha256', sessionSecret()).update(value).digest('base64url');
}

export function createSession(sessionUser: AuthSessionUser) {
  const payload: AuthSessionPayload = {
    user: sessionUser,
    expires: new Date(Date.now() + SESSION_LIFETIME_MS).toISOString(),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const token = `${encodedPayload}.${sign(encodedPayload)}`;
  return { token, payload };
}

export function getSessionByToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  const expectedSignature = encodedPayload ? sign(encodedPayload) : '';
  if (!encodedPayload || !signature || signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as AuthSessionPayload;
    if (!payload?.user?.id || !payload.expires || Date.parse(payload.expires) <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function destroySession(token?: string | null) {
  // Tokens are stateless; clearing the browser cookie invalidates the session client-side.
}
