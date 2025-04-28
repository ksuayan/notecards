// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Use 'site' as the default database name if MONGODB_DB is not provided
const dbName = process.env.MONGODB_DB || 'site';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true,
      maxIdleTimeMS: 60000,
      waitQueueTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,
    };

    cached.promise = MongoClient.connect(process.env.MONGODB_URI, opts)
      .then((client) => {
        console.log('MongoDB connected successfully');
        return {
          client,
          db: client.db(dbName),
        };
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Create a single instance of the client promise
const clientPromise = connectToDatabase();

// Export both the function and the promise
export { connectToDatabase, clientPromise };
export default clientPromise;