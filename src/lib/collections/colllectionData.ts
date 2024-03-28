import { ICollection } from "@/types/ICollection";
import { PrismaClient } from "@prisma/client";
import { unstable_noStore } from "next/cache";

const prisma = new PrismaClient();

export async function fetchCollection(id: ICollection["id"]) {
  unstable_noStore();
  return await prisma.collection.findUnique({ where: { id }, include: { items: true } });
}
