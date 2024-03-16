"use server";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(30),
});

export interface LoginState {
  msg?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
  };
}

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    console.log("login error");
    return {
      msg: "Somthing goes wrong",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { msg: "success" };
}

const registrationSchema = z
  .object({
    name: z.string().min(2).max(60),
    email: z.string().email(),
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
  const validatedFields = registrationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });
  if (!validatedFields.success) {
    console.log("register error");
    return {
      msg: "Somthing goes wrong",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return {};
}
