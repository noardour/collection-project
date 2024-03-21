"use server";

import { IUser } from "@/types/IUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchUsers(): Promise<IUser[]> {
  return await prisma.user.findMany({ orderBy: [{ createdAt: "asc" }] });
}

export async function fetchUser(id: IUser["id"]) {
  return await prisma.user.findUnique({ where: { id } });
}
