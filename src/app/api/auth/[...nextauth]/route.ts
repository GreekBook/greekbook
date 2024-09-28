import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {db} from "@/lib/db/db";
import bcrypt from "bcrypt";
import {User as DBUSer} from "@/lib/db/schema";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            checks: ['none'],
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const {email, password} = credentials as {
                    email: string,
                    password: string,
                };
                const user: DBUSer = db.query.users.findFirst({
                    where: {
                        email: email,
                    },
                });
                if (!user || !await bcrypt.compare(password, user.password)) {
                    return null;
                }
                return user;
            }
        }),
        // ...add more providers here
    ],
    callbacks: {
    }
});

export { handler as GET, handler as POST }