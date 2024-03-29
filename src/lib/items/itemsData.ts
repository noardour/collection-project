import { IItem } from "@/types/IItem";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

export async function fetchItem(id: IItem["id"]) {
  return await prisma.item.findUnique({ where: { id } });
}
