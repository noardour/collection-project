import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedCollections = async () => {
  const users = await prisma.user.findMany({ where: { role: "USER" } });

  users.forEach(async (user) => {
    await prisma.collection.create({
      data: {
        title: "TestCollection",
        category: "OTHER",
        description:
          "Имеется спорная точка зрения, гласящая примерно следующее: базовые сценарии поведения пользователей, превозмогая сложившуюся непростую экономическую ситуацию, указаны как претенденты на роль ключевых факторов. Равным образом, высокотехнологичная концепция общественного уклада влечет за собой процесс внедрения и модернизации системы массового участия. С другой стороны, выбранный нами инновационный путь способствует подготовке и реализации экспериментов, поражающих по своей масштабности и грандиозности.",
        userId: user.id,

        items: {
          create: [
            { image: faker.image.url({ width: 300, height: 200 }), title: "test item" },
            { image: faker.image.url({ width: 300, height: 200 }), title: "test item 2" },
            { image: faker.image.url({ width: 300, height: 200 }), title: "test item 3" },
          ],
        },
      },
    });
  });
};

export default seedCollections;
