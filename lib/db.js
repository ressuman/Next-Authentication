import { hashPassword } from "@/helpers/hash";
import { MongoClient } from "mongodb";

export async function connectToDatabase(dbName) {
  const url = process.env.MONGO_DB_URL;
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to database");
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

export async function findUserByEmail(
  client,
  dbName,
  collectionName,
  userEmail
) {
  try {
    const usersCollection = client.db(dbName).collection(collectionName);

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      throw new Error("No user found");
    }

    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Failed to find user by email.");
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

export async function updateUserPassword(
  client,
  dbName,
  collectionName,
  userEmail,
  newPassword
) {
  try {
    const usersCollection = client.db(dbName).collection(collectionName);

    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );

    if (result.modifiedCount === 0) {
      throw new Error("No user found or password not updated");
    }

    return result;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw new Error("Failed to update password.");
  }
}
