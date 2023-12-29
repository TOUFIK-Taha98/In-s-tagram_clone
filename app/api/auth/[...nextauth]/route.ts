import { config } from "@/auth";
import NextAuth from "next-auth/next";

// @ts-ignore
const handler = NextAuth(config);

export { handler as GET, handler as POST };
