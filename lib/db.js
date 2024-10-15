import { MongoClient } from "mongodb";

export async function connectToDatabase(dbName) {
  const url = process.env.MONGO_DB_URL;
  const client = new MongoClient(url);

  try {
    await client.connect();
    return { client, dbName };
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database.");
  }
}

export async function insertDocument(client, dbName, collectionName, document) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const insertResult = await collection.insertOne(document);
    return insertResult;
  } catch (error) {
    console.error("Document insertion error:", error);
    throw new Error("Failed to insert document.");
  }
}

export async function checkDocumentExists(
  client,
  dbName,
  collectionName,
  query
) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const existingDocument = await collection.findOne(query);
    return existingDocument !== null;
  } catch (error) {
    console.error("Error checking document existence:", error);
    throw new Error("Could not check for existing document.");
  }
}

export async function getAllDocuments(
  client,
  dbName,
  collectionName,
  find = {},
  sort = {}
) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find(find).sort(sort).toArray();
    return documents;
  } catch (error) {
    console.error("Failed to retrieve documents:", error);
    throw new Error("Could not get documents.");
  }
}
