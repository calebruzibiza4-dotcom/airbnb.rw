import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

let clientPromise: Promise<MongoClient> | null = null;

function databaseName() {
  return process.env.MONGODB_DB?.trim() || 'test';
}

function mongoUri() {
  const uri = process.env.MONGODB_DIRECT_URI?.trim() || process.env.DATABASE_URL?.trim();
  if (!uri) throw new Error('MongoDB is not configured.');
  return uri;
}

export function getMongoDatabase() {
  if (!clientPromise) {
    const client = new MongoClient(mongoUri(), {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    clientPromise = client.connect();
  }
  return clientPromise.then((client) => client.db(databaseName()));
}
