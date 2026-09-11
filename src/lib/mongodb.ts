import { MongoClient, type Collection, type Db } from "mongodb";
import type { EnquiryDocument } from "@/lib/enquiry";

const uri = process.env.MONGODB_URI?.trim();

function databaseName() {
  const fromEnv = process.env.MONGODB_DB?.trim();
  if (fromEnv) return fromEnv;
  if (!uri) return "station-eight";
  try {
    const normalised = uri.replace(/^mongodb(\+srv)?:\/\//, "https://");
    const path = new URL(normalised).pathname.replace(/^\//, "");
    return path || "station-eight";
  } catch {
    return "station-eight";
  }
}

const clientOptions = {
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const globalForMongo = globalThis as unknown as {
  enquiryIndexes?: Promise<void>;
};

async function connectClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, clientOptions).connect();
    }
    return global._mongoClientPromise;
  }
  return new MongoClient(uri, clientOptions).connect();
}

/**
 * Returns the database handle, or null if MongoDB is not configured or the
 * connection fails. Chatbot callers treat null as a soft failure.
 */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;
  try {
    const client = await connectClient();
    return client.db(databaseName());
  } catch (error) {
    console.error("[station-eight] MongoDB connection failed", error);
    return null;
  }
}

export async function getEnquiriesCollection(): Promise<Collection<EnquiryDocument>> {
  const db = await getDb();
  if (!db) {
    throw new Error("MONGODB_URI is not set");
  }
  const collection = db.collection<EnquiryDocument>("enquiries");
  if (!globalForMongo.enquiryIndexes) {
    globalForMongo.enquiryIndexes = collection
      .createIndexes([
        { key: { createdAt: -1 } },
        { key: { email: 1, createdAt: -1 } },
      ])
      .then(() => undefined)
      .catch(() => undefined);
  }
  await globalForMongo.enquiryIndexes;
  return collection;
}
