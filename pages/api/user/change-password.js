import { getServerSession } from "next-auth/next";
//import { authOptions } from "../auth/[...nextauth]";
import {
  connectToDatabase,
  findUserByEmail,
  updateUserPassword,
} from "@/lib/db";
import { hashPassword, verifyPassword } from "@/helpers/hash";
import { authOptions } from "../auth/[...nextauth]";
//import { authOptions } from "@pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  // let client;
  try {
    if (req.method !== "PATCH") {
      res.status(401).json({ message: "Incorrect method used" });
      return;
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res
        .status(401)
        .json({ message: "You must be logged in. Not authenticated" });
      return;
    }

    const userEmail = session.user.email;
    // const oldPassword = req.body.oldPassword;
    // const newPassword = req.body.newPassword;
    const { oldPassword, newPassword } = req.body;

    const { client, dbName } = await connectToDatabase("Auth");
    const collectionName = "users";

    const user = await findUserByEmail(
      client,
      dbName,
      collectionName,
      userEmail
    );

    if (!user) {
      res.status(401).json({ message: "User not found/does not exists" });
      client.close();
      return;
    }

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(
      oldPassword,
      currentPassword
    );

    if (!passwordsAreEqual) {
      res.status(403).json({ message: "Invalid password!" });
      client.close();
      return;
    }

    //const hashedPassword = await hashPassword(newPassword);

    const result = await updateUserPassword(
      client,
      dbName,
      collectionName,
      userEmail,
      newPassword
    );

    client.close();

    res.status(200).json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  } finally {
    client.close();
  }
}
