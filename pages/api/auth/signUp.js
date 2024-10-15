import { hashPassword } from "@/helpers/hash";
import {
  checkDocumentExists,
  connectToDatabase,
  getAllDocuments,
  insertDocument,
} from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      if (
        !email ||
        email.trim() === "" ||
        !email.includes("@") ||
        !password ||
        password.trim().length < 7
      ) {
        res.status(422).json({ message: "Invalid input" });
        return;
      }

      const { client, dbName } = await connectToDatabase("Auth");

      // Check for existing email
      // const existingUsers = await getAllDocuments(client, dbName, "users", {
      //   email,
      // });
      // if (existingUsers.length > 0) {
      //   res.status(422).json({ message: "Email already exists" });
      //   return;
      // }

      const emailExists = await checkDocumentExists(client, dbName, "users", {
        email,
      });
      if (emailExists) {
        res.status(422).json({ message: "Email already exists" });
        client.close();
        return;
      }

      const hashedPassword = await hashPassword(password);

      const newUser = {
        email,
        password: hashedPassword,
        date: new Date(),
      };

      const insertResult = await insertDocument(
        client,
        dbName,
        "users",
        newUser
      );

      newUser._id = insertResult.insertedId;

      res.status(201).json({
        message: "Signed Up!",
        data: newUser,
      });
      client.close();
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
}
