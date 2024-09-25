import NextAuth from "next-auth"
import { OAuthProviders } from "./provider"
import { db } from "@/db/core"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { accounts, users, verificationTokens } from "@/db/schema"

 
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
  }
})