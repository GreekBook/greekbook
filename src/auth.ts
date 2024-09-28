import NextAuth, {DefaultSession} from "next-auth"
import Google from "next-auth/providers/google"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/lib/db/db";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            role: "admin" | "user",
            dateOfBirth: string,
            kycVerified: boolean,
            onboarded: boolean,
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"]
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [Google],
    trustHost: true
})