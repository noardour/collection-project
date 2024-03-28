import { PrismaClient } from "@prisma/client";
import seedUsers from "./seeders/seedUsers.mjs";
import seedCollections from "./seeders/seedCollections.mjs";

const prisma = new PrismaClient();

(async () => {
  if (!(await prisma.user.count())) await seedUsers();
  if (!(await prisma.collection.count())) await seedCollections();
})();
