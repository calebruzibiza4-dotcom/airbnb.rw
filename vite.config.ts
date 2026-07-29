import 'dotenv/config';
import crypto from 'node:crypto';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { POST as handleRegister } from './src/api/register/route';
import { POST as handleLogin } from './src/api/login/route';

function getBaseUrl(req: any) {
  const forwardedProto = req.headers['x-forwarded-proto']?.toString().split(',')[0]?.trim();
  const protocol = forwardedProto || 'http';
  const host = req.headers.host || 'localhost:5173';
  return `${protocol}://${host}`;
}

function parseCookies(req: any) {
  const header = req.headers.cookie;
  if (!header || typeof header !== 'string') {
    return {} as Record<string, string>;
  }

  return header.split(';').reduce<Record<string, string>>((accumulator, chunk) => {
    const [rawKey, ...rawValue] = chunk.trim().split('=');
    if (!rawKey) {
      return accumulator;
    }

    accumulator[rawKey] = rawValue.join('=');
    return accumulator;
  }, {});
}

async function exchangeGoogleCode(code: string, redirectUri: string) {
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  const tokenPayload = (await tokenResponse.json()) as { access_token?: string; error?: string; error_description?: string };
  if (!tokenResponse.ok || !tokenPayload.access_token) {
    throw new Error(tokenPayload.error_description || 'Unable to finish Google sign-in.');
  }

  const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokenPayload.access_token}` },
  });

  if (!profileResponse.ok) {
    throw new Error('Unable to read your Google profile.');
  }

  return (await profileResponse.json()) as { id?: string; email?: string; name?: string; picture?: string | null };
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'register-api-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url ? new URL(req.url, 'http://localhost').pathname : '';
          const method = req.method || 'GET';

          if (method === 'GET' && url === '/api/auth/signin/google') {
            const state = crypto.randomUUID();
            const callbackUrl = `${getBaseUrl(req)}/api/auth/callback/google`;
            const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
            authUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID || '');
            authUrl.searchParams.set('redirect_uri', callbackUrl);
            authUrl.searchParams.set('response_type', 'code');
            authUrl.searchParams.set('scope', 'openid email profile');
            authUrl.searchParams.set('access_type', 'offline');
            authUrl.searchParams.set('prompt', 'consent');
            authUrl.searchParams.set('state', state);

            res.statusCode = 302;
            res.setHeader('Location', authUrl.toString());
            res.setHeader('Set-Cookie', `google_oauth_state=${state}; Path=/; Max-Age=600; HttpOnly; SameSite=Lax`);
            res.end();
            return;
          }

          if (method === 'GET' && url === '/api/auth/callback/google') {
            const query = new URL(req.url || '/', getBaseUrl(req)).searchParams;
            const code = query.get('code');
            const state = query.get('state');
            const cookies = parseCookies(req);

            if (!code || !state || cookies.google_oauth_state !== state) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(`<!doctype html><html><body><p>Google sign-in could not be completed.</p></body></html>`);
              return;
            }

            try {
              const profile = await exchangeGoogleCode(code, `${getBaseUrl(req)}/api/auth/callback/google`);
              const sessionPayload = {
                user: {
                  id: profile.id || profile.email || 'google-user',
                  email: profile.email || '',
                  name: profile.name || profile.email || 'Google User',
                  image: profile.picture || null,
                },
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
              };

              const html = `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Signing you in</title></head>
  <body>
    <script>
      try {
        window.localStorage.setItem('inzu-auth-session-v1', ${JSON.stringify(JSON.stringify(sessionPayload))});
      } catch (error) {
        console.error(error);
      }
      window.location.replace('/');
    </script>
  </body>
</html>`; 

              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(html);
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Unable to sign in.';
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(`<!doctype html><html><body><p>${message}</p></body></html>`);
            }

            return;
          }

          if ((url !== '/api/register' && url !== '/api/login') || method !== 'POST') {
            return next();
          }

          try {
            let rawBody = '';
            for await (const chunk of req) {
              rawBody += chunk;
            }

            const body = rawBody ? JSON.parse(rawBody) : {};

            if (url === '/api/register') {
              const { email, name, password, phone } = body as { email?: string; name?: string; password?: string; phone?: string };

              if (!email || typeof email !== 'string' || !email.trim() || !name || typeof name !== 'string' || !name.trim() || !password || typeof password !== 'string' || password.length < 8 || !phone || typeof phone !== 'string' || !phone.trim()) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Invalid signup data.' }));
                return;
              }
            }

            const request = new Request(`http://localhost${url}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: rawBody,
            });

            const response = url === '/api/login' ? await handleLogin(request) : await handleRegister(request);
            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });
            res.end(await response.text());
          } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: url === '/api/login' ? 'Unable to log in.' : 'Unable to create account.' }));
          }
        });
      },
    },
  ],
});
