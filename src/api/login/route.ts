import 'dotenv/config';
import bcrypt from 'bcrypt';
import { MongoClient, ServerApiVersion } from 'mongodb';

let mongoClient: MongoClient | null = null;

function getTargetDatabaseName() {
  if (process.env.MONGODB_DB && process.env.MONGODB_DB.trim()) {
    return process.env.MONGODB_DB.trim();
  }

  if (!process.env.DATABASE_URL) {
    return 'test';
  }

  try {
    const parsed = new URL(process.env.DATABASE_URL);
    const databaseName = parsed.pathname.replace(/^\/+/, '');
    return databaseName || 'test';
  } catch {
    return 'test';
  }
}

function getFallbackMongoUri(targetUri: string) {
  const directUriFromEnv = process.env.MONGODB_DIRECT_URI?.trim();
  if (directUriFromEnv) {
    return directUriFromEnv;
  }

  const parsedUri = new URL(targetUri);
  const databaseName = getTargetDatabaseName();
  const credentials = parsedUri.username
    ? `${encodeURIComponent(parsedUri.username)}:${encodeURIComponent(parsedUri.password || '')}@`
    : '';

  return `mongodb://${credentials}ac-nl7rbtr-shard-00-02.xhapcjf.mongodb.net:27017/${databaseName}?authSource=admin&directConnection=true&tls=true&tlsAllowInvalidCertificates=true&retryWrites=true&w=majority`;
}

async function getMongoClient() {
  if (!mongoClient) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured.');
    }

    const client = new MongoClient(getFallbackMongoUri(process.env.DATABASE_URL), {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    await client.db(getTargetDatabaseName()).command({ ping: 1 });
    mongoClient = client;
  }

  return mongoClient;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identity = typeof body?.identity === 'string' ? body.identity.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!identity || password.length < 8) {
      return new Response(JSON.stringify({ message: 'Enter a valid email or phone number and password.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await getMongoClient();
    const targetDatabase = getTargetDatabaseName();
    const users = client.db(targetDatabase).collection('users');

    const normalizedIdentity = identity.toLowerCase();
    const existingUser = await users.findOne({
      $or: [{ email: normalizedIdentity }, { phone: normalizedIdentity }],
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: 'No account found for that email or phone number.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const passwordMatches = await bcrypt.compare(password, existingUser.hashedPassword);
    if (!passwordMatches) {
      return new Response(JSON.stringify({ message: 'Invalid password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        message: 'Logged in',
        user: {
          id: existingUser._id?.toString?.() ?? null,
          email: existingUser.email,
          name: existingUser.name,
          phone: existingUser.phone,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to log in.';
    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
