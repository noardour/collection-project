"use server";

import { signIn } from "@/auth/auth";
import { validateLogin } from "@/validators/loginValidator";
import { validateRegistration } from "@/validators/registrationValidator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type LoginState =
  | {
      msg?: string | null;
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = await validateLogin(formData);
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, msg: "Login error" };
  }
  await signIn("credentials", validatedFields.data);
  return;
}

export type RegistrationState =
  | {
      msg?: string | null;
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
    }
  | undefined;

export async function register(prevState: RegistrationState, formData: FormData) {
  const validatedFields = await validateRegistration(formData);
  if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };
  const { confirmPassword, ...data } = validatedFields.data;
  const user = await prisma.user.create({ data });
  await signIn("credentials", user);
  return;
}
