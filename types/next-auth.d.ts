import { userRoles } from "@/auth/core"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"]
  }

  interface User {
    role: userRoles | null
  }
}