import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedUsers = async () => {
  const data = [
    ...Array.from({ length: 5 }, (_, i) => ({
      name: `Admin${i}`,
      email: `admin${i}@test.com`,
      password: "1234",
      role: "ADMIN",
    })),
    ...Array.from({ length: 30 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "1234",
    })),
  ];

  await prisma.user.createMany({
    data,
  });
};

export default seedUsers;
