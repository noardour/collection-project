import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

async function emailUnique(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return !user;
}

async function nameUnique(name: string) {
  const user = await prisma.user.findUnique({
    where: { name },
  });
  return !user;
}

const registrationSchema = z
  .object({
    name: z.string().min(2).max(60).refine(nameUnique, "User with this name is already registered"),
    email: z.string().min(1, "Email is required").email().refine(emailUnique, "User with this email is already regisred"),
    password: z.string().min(4).max(30),
    confirmPassword: z.string().min(1),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export function validateRegistration(formData: FormData) {
  return registrationSchema.safeParseAsync({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });
}
