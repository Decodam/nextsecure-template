import NextAuth from "next-auth"
import { OAuthProviders } from "./provider"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    ...OAuthProviders.map(({ config }) => config),
  ],
})