"use server";

import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2).max(70),
  email: z.string().email(),
  password: z.string().min(4),
});

const loginSchema = userSchema.omit({ name: true });

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
