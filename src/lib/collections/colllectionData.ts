import { ICollection } from "@/types/ICollection";
import { PrismaClient } from "@prisma/client";
import { unstable_noStore } from "next/cache";

const prisma = new PrismaClient();

export async function fetchCollection(id: ICollection["id"]) {
  unstable_noStore();
  return await prisma.collection.findUnique({ where: { id }, include: { items: true } });
}

export async function fetchLatestCollections() {
  return await prisma.collection.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { User: true } });
}

export async function fetchBiggestCollections() {
  return (await prisma.$queryRaw`
    SELECT collections.*, COUNT(items.id) AS itemCount
    FROM collections
    LEFT JOIN items ON items.collection_id = collections.id
    GROUP BY collections.id
    ORDER BY itemCount DESC`) as (ICollection & { itemcount: number })[];
}
