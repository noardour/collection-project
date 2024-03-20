"use server";

import { IUser } from "@/types/IUser";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function setStatus(id: IUser["id"], status: IUser["status"]) {
  await prisma.user.update({ data: { status }, where: { id } });
  revalidatePath("/admin-panel");
}

export async function setStatusMany(ids: IUser["id"][], status: IUser["status"]) {
  await prisma.user.updateMany({ data: { status }, where: { id: { in: ids } } });
  revalidatePath("/admin-panel");
}

export async function setRole(id: IUser["id"], role: IUser["role"]) {
  await prisma.user.update({ data: { role }, where: { id } });
  revalidatePath("/admin-panel");
}

export async function setRoleMany(ids: IUser["id"][], role: IUser["role"]) {
  await prisma.user.updateMany({ data: { role }, where: { id: { in: ids } } });
  revalidatePath("/admin-panel");
}

export async function removeUser(id: IUser["id"]) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin-panel");
}

export async function removeUsers(ids: IUser["id"][]) {
  await prisma.user.deleteMany({ where: { id: { in: ids } } });
  revalidatePath("/admin-panel");
}
