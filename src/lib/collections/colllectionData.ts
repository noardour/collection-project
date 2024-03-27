import { ICollection } from "@/types/ICollection";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchCollection(id: ICollection["id"]) {
  return await prisma.collection.findUnique({ where: { id }, include: { items: true } });
}
