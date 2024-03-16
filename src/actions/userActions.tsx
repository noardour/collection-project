"use server";

import { IUser } from "@/types/IUser";
import { validateLogin } from "@/validators/loginValidator";
import { validateRegistration } from "@/validators/registrationValidator";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export async function fetchUsers(): Promise<IUser[]> {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, status: true, role: true, createdAt: true },
  });

  return users;
}

export interface LoginState {
  msg?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
  };
}

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = await validateLogin(formData);
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }
  return { msg: "success" };
}

export interface RegistrationState {
  msg?: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}

export async function register(prevState: RegistrationState, formData: FormData) {
  const validatedFields = await validateRegistration(formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return { msg: "success" };
}
