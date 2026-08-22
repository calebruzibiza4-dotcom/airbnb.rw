import bcrypt from 'bcrypt';
import { getMongoDatabase } from '../../libs/mongodb';
import { createSession } from '../../auth/session-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!email || !name || !phone || password.length < 8) return new Response(JSON.stringify({ message: 'Invalid signup data.' }), { status: 400 });
    const db = await getMongoDatabase();
    if (await db.collection('users').findOne({ email })) return new Response(JSON.stringify({ message: 'This email is already registered.' }), { status: 409 });
    const now = new Date();
    const result = await db.collection('users').insertOne({ email, name, phone, hashedPassword: await bcrypt.hash(password, 12), createdAt: now, updatedAt: now });
    const { token, payload } = createSession({ id: result.insertedId.toString(), firstName: name.split(' ')[0] || '', lastName: name.split(' ').slice(1).join(' '), name, email, phone, image: null });
    return new Response(JSON.stringify({ message: 'Account created', user: payload.user }), { status: 201, headers: { 'Content-Type': 'application/json', 'Set-Cookie': `inzu_session=${token}; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax` } });
  } catch (error) {
    console.error('Registration failed:', error);
    return new Response(JSON.stringify({ message: 'Unable to create account.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
