import { IUser } from "@/types/IUser";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import creditailProvider from "./providers/credentials";
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

export const authConfig = {
  providers: [creditailProvider],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request }) {
      if (request.nextUrl.pathname.startsWith("/admin-panel") && auth?.user?.role !== "ADMIN") {
        return NextResponse.rewrite(new URL("/page-that-not-exists", request.nextUrl.origin));
      }
      if (auth && ["/login", "/registration"].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      }
      if (auth && auth.user.status === "BLOCKED") return NextResponse.redirect(new URL("/api/logout", request.nextUrl.origin));
      return true;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({ where: { email: token.email || undefined } });
      if (user) {
        session.user.role = user.role;
        session.user.status = user.status;
      }
      return session;
    },
    jwt({ token, user }) {
      return token;
    },
  },
  debug: process.env.NODE_ENV == "development",
} satisfies NextAuthConfig;
