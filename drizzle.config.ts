import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: 'postgresql',
  out: "./drizzle/migrations",
  migrations: {
    prefix: 'index'
  },
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
})