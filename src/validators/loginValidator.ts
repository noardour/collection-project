"use sever";

import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

const loginSchema = z
  .object({
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(4).max(30),
  })
  .superRefine(async (val, ctx) => {
    const { email, password } = val;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "No such User", path: ["email"] });
    if (user && user.password !== password) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Wrong password", path: ["password"] });
  });

export function validateLogin(formData: FormData) {
  return loginSchema.safeParseAsync({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}
