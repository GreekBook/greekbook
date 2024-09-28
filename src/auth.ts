import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/lib/db/db";
import {accounts, users, sessions} from "@/lib/db/schema";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
    }),
    providers: [Google],
})