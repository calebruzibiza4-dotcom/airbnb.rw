import bcrypt from 'bcrypt';
import { getMongoDatabase } from '../../libs/mongodb';
import { createSession } from '../../auth/session-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identity = typeof body?.identity === 'string' ? body.identity.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!identity || password.length < 8) return new Response(JSON.stringify({ message: 'Enter a valid email or phone number and password.' }), { status: 400 });
    const db = await getMongoDatabase();
    const user = await db.collection('users').findOne({ $or: [{ email: identity }, { phone: identity }] });
    if (!user || typeof user.hashedPassword !== 'string' || !(await bcrypt.compare(password, user.hashedPassword))) return new Response(JSON.stringify({ message: 'Invalid credentials.' }), { status: 401 });
    const { token, payload } = createSession({ id: user._id.toString(), firstName: user.firstName || user.name?.split(' ')[0] || '', lastName: user.lastName || '', name: user.name || identity, email: user.email || '', phone: user.phone || null, image: user.image || null });
    return new Response(JSON.stringify({ message: 'Logged in', user: payload.user }), { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': `inzu_session=${token}; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax` } });
  } catch (error) {
    console.error('Login failed:', error);
    return new Response(JSON.stringify({ message: 'Unable to log in.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
