import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/db"
import authConfig from "./auth.config"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
