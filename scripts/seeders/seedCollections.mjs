import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateCollection = (id) => ({
  image: faker.image.url({ height: 600, width: 800 }),
  title: faker.lorem.word({ length: { min: 1, max: 5 } }),
  category: "OTHER",
  description: faker.lorem.paragraph({ min: 12, max: 36 }),
  User: {
    connect: { id },
  },

  items: {
    create: Array.from({ length: 4 + Math.round(Math.random() * 6) }, () => ({
      image: faker.image.url({ width: 400, height: 200 }),
      title: faker.lorem.word({ length: { min: 1, max: 5 } }),
    })),
  },
});

/* const generateCarsCollection = (id) => ({
  title: "Cars Collection",
  category: "CARS",
  description: faker.lorem.paragraph({ min: 12, max: 36 }),
  userId: id,

  items: {
    create: Array.from({ length: 4 + Math.round(Math.random() * 6) }, () => ({
      image: faker.image.url({ width: 400, height: 200 }),
      title: faker.vehicle.vehicle(),
    })),
  },
}); */

const seedCollections = async () => {
  const users = await prisma.user.findMany({ where: { role: "USER" } });
  const promises = [];

  users.forEach(async (user) => {
    promises.push(prisma.collection.create({ data: generateCollection(user.id) }));
  });

  await Promise.all(promises);
};

export default seedCollections;
