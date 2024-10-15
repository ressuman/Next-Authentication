import { verifyPassword } from "@/helpers/hash";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: { jwt: true },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { client, dbName } = await connectToDatabase("Auth");

        const usersCollection = client.db(dbName).collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
