import { Provider } from "next-auth/providers";
import credentials from "next-auth/providers/credentials";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

const credentialsProvider: Provider = credentials({
  async authorize(credentials) {
    const { email, password } = credentials as { email: string; password: string };
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.password == password && user.status !== "BLOCKED") return user;
    return null;
  },
});

export default credentialsProvider;
