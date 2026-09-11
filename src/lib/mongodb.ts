import { MongoClient, type Collection, type Db } from "mongodb";
import type { EnquiryDocument } from "@/lib/enquiry";

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
  mongoConnecting?: Promise<MongoClient>;
  enquiryIndexes?: Promise<void>;
};

function databaseName(uri: string) {
  try {
    const normalised = uri.replace(/^mongodb\+srv:\/\//, "https://").replace(/^mongodb:\/\//, "https://");
    const path = new URL(normalised).pathname.replace(/^\//, "");
    return path || "station-eight";
  } catch {
    return "station-eight";
  }
}

async function getClient() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (globalForMongo.mongoClient) {
    return globalForMongo.mongoClient;
  }
  if (!globalForMongo.mongoConnecting) {
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
    globalForMongo.mongoConnecting = client.connect().then((connected) => {
      globalForMongo.mongoClient = connected;
      return connected;
    });
  }
  return globalForMongo.mongoConnecting;
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI?.trim() ?? "";
  const client = await getClient();
  return client.db(databaseName(uri));
}

export async function getEnquiriesCollection(): Promise<Collection<EnquiryDocument>> {
  const collection = (await getDb()).collection<EnquiryDocument>("enquiries");
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
