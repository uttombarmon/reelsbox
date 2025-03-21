import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                console.log(credentials);
                if (!credentials) {
                    throw new Error("Missing email or password.");
                }

                try {
                    await dbConnect()
                    const user = await User.findOne({ email: credentials.email });
                    console.log(user);
                    if (!user) {
                        throw new Error("Please register first!")
                    }

                    const validUser = await bcrypt.compare(credentials.password, user.password);
                    if (!validUser) {
                        throw new Error("Please provide right credentials.")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }
                } catch (error) {
                    throw error

                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user} ){
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }){
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages:{
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
}