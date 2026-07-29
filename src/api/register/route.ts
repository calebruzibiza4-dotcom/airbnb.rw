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

function getFallbackMongoUris(targetUri: string) {
  const candidates = [targetUri];

  const directUriFromEnv = process.env.MONGODB_DIRECT_URI?.trim();
  if (directUriFromEnv) {
    candidates.push(directUriFromEnv);
  }

  const parsedUri = new URL(targetUri);
  const atlasHost = parsedUri.hostname;
  const isAtlasCluster = atlasHost.includes('mongodb.net') || atlasHost.includes('cluster0');

  if (isAtlasCluster) {
    const databaseName = getTargetDatabaseName();
    const credentials = parsedUri.username
      ? `${encodeURIComponent(parsedUri.username)}:${encodeURIComponent(parsedUri.password || '')}@`
      : '';
    const directUri = `mongodb://${credentials}ac-nl7rbtr-shard-00-02.xhapcjf.mongodb.net:27017/${databaseName}?authSource=admin&directConnection=true&tls=true&tlsAllowInvalidCertificates=true&retryWrites=true&w=majority`;
    candidates.push(directUri);
  }

  return [...new Set(candidates)];
}

async function getMongoClient() {
  if (!mongoClient) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured.');
    }

    const targetUri = process.env.DATABASE_URL;
    const targetDatabase = getTargetDatabaseName();

    let lastError: unknown;

    for (const candidateUri of getFallbackMongoUris(targetUri)) {
      const client = new MongoClient(candidateUri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      try {
        await client.connect();
        await client.db(targetDatabase).command({ ping: 1 });
        mongoClient = client;
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!mongoClient) {
      throw lastError ?? new Error('Unable to connect to MongoDB.');
    }
  }

  return mongoClient;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password, phone } = body as {
      email?: string;
      name?: string;
      password?: string;
      phone?: string;
    };

    const validationPassed =
      typeof email === 'string' &&
      email.trim().length > 0 &&
      typeof name === 'string' &&
      name.trim().length > 0 &&
      typeof password === 'string' &&
      password.length >= 8 &&
      typeof phone === 'string' &&
      phone.trim().length > 0;

    if (!validationPassed) {
      return new Response(JSON.stringify({ message: 'Invalid signup data.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim().replace(/[-\s]+/g, '');
    const normalizedName = name.trim();

    const client = await getMongoClient();

    const targetDatabase = getTargetDatabaseName();
    const users = client.db(targetDatabase).collection('users');

    const existingUser = await users.findOne({ email: normalizedEmail });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'This email is already registered.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdAt = new Date();

    let result;
    let lastWriteError: unknown;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        result = await users.insertOne(
          {
            email: normalizedEmail,
            name: normalizedName,
            phone: normalizedPhone,
            hashedPassword,
            createdAt,
            updatedAt: createdAt,
          },
          { writeConcern: { w: 'majority' } },
        );
        break;
      } catch (error) {
        lastWriteError = error;
        const message = error instanceof Error ? error.message : 'Unknown MongoDB write error';
        if (message.includes('not primary') || message.includes('retryable')) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }
        throw error;
      }
    }

    if (!result) {
      throw lastWriteError ?? new Error('Unable to create user document.');
    }

    return new Response(
      JSON.stringify({
        id: result.insertedId.toString(),
        email: normalizedEmail,
        name: normalizedName,
        phone: normalizedPhone,
        createdAt: createdAt.toISOString(),
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message: `Unable to create account. ${message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
