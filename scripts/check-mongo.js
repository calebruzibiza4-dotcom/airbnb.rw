import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.DATABASE_URL;
console.log('DATABASE_URL present:', Boolean(uri));
if (!uri) {
  console.error('DATABASE_URL is missing.');
  process.exit(1);
}

console.log('URI preview:', uri.replace(/:[^:@]+@/, ':***@'));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  console.log('MongoDB connection status: CONNECTED');
  await client.db('test').command({ ping: 1 });
  console.log('MongoDB ping status: OK');
} catch (error) {
  console.error('MongoDB connection status: FAILED');
  console.error(error);
  process.exit(1);
} finally {
  await client.close();
}
