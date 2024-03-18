import { IUser, UserRole } from "@/types/IUser";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import creditailProvider from "./providers/credentials";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [creditailProvider],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async authorized({ auth, request }) {
      if (request.nextUrl.pathname.startsWith("/admin-panel") && auth?.user?.role !== "ADMIN") {
        return NextResponse.rewrite(new URL("/page-that-not-exists", request.nextUrl.origin));
      }
      if (auth && ["/login", "/registration"].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      }
      return true;
    },
    session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as IUser)?.role;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV == "development",
} satisfies NextAuthConfig;
