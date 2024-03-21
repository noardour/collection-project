"use server";

import { signIn } from "@/auth/auth";
import { validateLogin } from "@/validators/loginValidator";
import { validateRegistration } from "@/validators/registrationValidator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type LoginState =
  | {
      formErrors?: string[];
      fieldErrors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const validatedFields = await validateLogin(formData);
  if (!validatedFields.success) {
    return { fieldErrors: validatedFields.error.flatten().fieldErrors, formErrors: validatedFields.error.flatten().formErrors };
  }
  await signIn("credentials", validatedFields.data);
  return;
}

export type RegistrationState =
  | {
      formErrors?: string[];
      fieldErrors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
    }
  | undefined;

export async function register(prevState: RegistrationState, formData: FormData): Promise<RegistrationState> {
  const validatedFields = await validateRegistration(formData);
  if (!validatedFields.success)
    return { fieldErrors: validatedFields.error.flatten().fieldErrors, formErrors: validatedFields.error.flatten().formErrors };
  const { confirmPassword, ...data } = validatedFields.data;
  const user = await prisma.user.create({ data });
  await signIn("credentials", user);
  return;
}
