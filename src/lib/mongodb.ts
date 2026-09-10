import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "station-eight";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Lazily connects to MongoDB Atlas and returns the database handle, or null
 * if MONGODB_URI isn't configured or the connection fails — callers should
 * treat a null return the same way they treat SMTP being unconfigured: log
 * and keep going, never let a missing/broken datastore break the chat.
 */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  try {
    let clientPromise: Promise<MongoClient>;

    if (process.env.NODE_ENV === "development") {
      // Reuse the client across Next.js dev hot-reloads instead of opening a
      // fresh connection pool on every file change.
      if (!global._mongoClientPromise) {
        global._mongoClientPromise = new MongoClient(uri).connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      clientPromise = new MongoClient(uri).connect();
    }

    const client = await clientPromise;
    return client.db(dbName);
  } catch (error) {
    console.error("[station-eight] MongoDB connection failed", error);
    return null;
  }
}
