import { NextResponse } from "next/server";
import creditailProvider from "./providers/credentials";
import { PrismaClient } from "@prisma/client/edge";
import NextAuth from "next-auth";

const prisma = new PrismaClient();

export const { auth, signIn, signOut } = NextAuth({
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
      console.log(`session: ${JSON.stringify(user)}`);
      if (user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.status = user.status;
      }
      return session;
    },
    jwt({ token }) {
      return token;
    },
  },
  debug: process.env.NODE_ENV == "development",
});
