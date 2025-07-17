import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials) {
          throw new Error("Missing email or password.");
        }

        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          console.log(user);
          if (!user) {
            throw new Error("Please register first!");
          }

          const validUser = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!validUser) {
            throw new Error("Please provide right credentials.");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account && account.provider === "google") {
        const googleProfile = profile as typeof profile & {
          email_verified?: boolean;
        };
        const isAllowed =
          !!googleProfile &&
          !!googleProfile.email_verified &&
          !!googleProfile.email &&
          googleProfile.email.endsWith("@example.com");
        return isAllowed ? true : false;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
