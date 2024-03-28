"use server";

import { IUser } from "@/types/IUser";
import { PrismaClient } from "@prisma/client";
import { unstable_noStore } from "next/cache";

const prisma = new PrismaClient();

export async function fetchUsers(): Promise<IUser[]> {
  unstable_noStore();
  return await prisma.user.findMany({ orderBy: [{ createdAt: "asc" }] });
}

export async function fetchUser(id: IUser["id"]) {
  unstable_noStore();
  return await prisma.user.findUnique({
    where: { id },
    include: { collections: { include: { items: true } } },
  });
}
