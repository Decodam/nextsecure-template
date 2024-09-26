import NextAuth from "next-auth"
import { OAuthProviders } from "./provider"
import { db } from "@/db/core"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { accounts, users, verificationTokens } from "@/db/schema"

export type userRoles = "user" | "admin" | "superuser"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    ...OAuthProviders.map(({ config }) => config),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as userRoles;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
    
      return token;
    }
  },
})