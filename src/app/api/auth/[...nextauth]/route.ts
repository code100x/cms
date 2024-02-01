import fetch from "node-fetch"
import NextAuth from "next-auth"
import db from "@/db";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { authOptions } from "@/lib/auth";
//@ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

