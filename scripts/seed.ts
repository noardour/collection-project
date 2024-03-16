import { PrismaClient } from "@prisma/client";
import seedUsers from "./seeders/seedUsers";

const prisma = new PrismaClient();

(async () => {
  if (!(await prisma.user.count())) await seedUsers();
})();
