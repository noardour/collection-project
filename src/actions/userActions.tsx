"use server";

import { signIn } from "@/auth/auth";
import { IUser, UserRole, UserStatus } from "@/types/IUser";
import { validateLogin } from "@/validators/loginValidator";
import { validateRegistration } from "@/validators/registrationValidator";
import { Selection } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
