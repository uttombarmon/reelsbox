/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { dbConnect } from "./db";

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
    async signIn({ user, account, profile }) {
      console.log("--- [signIn Callback] Debug ---");
      console.log("User object from provider/authorize:", user);
      console.log("Account object:", account);
      console.log("Profile object (raw from OAuth provider):", profile);

      await dbConnect(); // Ensure DB connection is established

      if (
        account &&
        (account.provider === "google" || account.provider === "facebook")
      ) {
        console.log(`user:${user}`);
        // Type assertion for Google/Facebook profile
        const oauthProfile = profile as typeof profile & {
          email_verified?: boolean;
          email?: string;
        };

        // Basic validation for OAuth providers
        const isEmailVerified = oauthProfile?.email_verified;
        const hasEmail = !!oauthProfile?.email;

        console.log(`[signIn Callback] Provider: ${account.provider}`);
        console.log(`[signIn Callback] Email Verified: ${isEmailVerified}`);
        console.log(`[signIn Callback] Has Email: ${hasEmail}`);

        // You can add more specific checks here, e.g., domain filtering
        // if (account.provider === "google" && !oauthProfile.email?.endsWith("@yourdomain.com")) {
        //   console.log("[signIn Callback] Google sign-in denied: Email domain not allowed.");
        //   return false;
        // }

        // If email is not verified or missing, deny sign-in
        if (!isEmailVerified || !hasEmail) {
          console.log(
            "[signIn Callback] OAuth sign-in denied: Email not verified or missing."
          );
          return false; // This will lead to AccessDenied error
        }

        try {
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            // User exists: Update their profile info if it changed
            console.log(
              "[signIn Callback] Existing user found. Updating profile."
            );
            if (
              existingUser.name !== user.name ||
              existingUser.image !== user.image
            ) {
              existingUser.name = user.name;
              existingUser.image = user.image;
              await existingUser.save();
            }
            // You might also want to link the OAuth account here if you have a separate 'Account' model
            // and the user previously signed up with credentials.
          } else {
            // New user: Create a new user record for OAuth sign-ups
            console.log(
              "[signIn Callback] New user via OAuth. Creating record."
            );
            const newUser = await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: new Date(), // Mark email as verified for OAuth
              role: "user", // Default role
              username: (user.email ?? "user").split("@")[0], // Simple default username
              password: null, // No password for OAuth users
            });
            console.log("New OAuth user created:", newUser.email);
          }
        } catch (dbError: any) {
          console.error(
            "[signIn Callback] Database error during OAuth signIn:",
            dbError.message
          );
          return false; // Deny sign-in if database operation fails
        }
      }
      // For Credentials provider, if authorize returns a user, then signIn should generally return true
      // unless you have other global signIn rules.
      console.log("[signIn Callback] Allowing sign-in.");
      return true;
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
