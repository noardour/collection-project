"use sever";

import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

async function emailUnique(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  console.log(!!user);
  return !user;
}

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email().refine(emailUnique, "User with this email already exists"),
  password: z.string().min(4).max(30),
});

export function validateLogin(formData: FormData) {
  return loginSchema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}
