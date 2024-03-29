import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateCollection = (id, options) => ({
  image: options?.image || faker.image.url({ height: 600, width: 800 }),
  title: options?.title || faker.lorem.word({ length: { min: 1, max: 5 } }),
  category: options?.category || "OTHER",
  description: faker.lorem.paragraph({ min: 12, max: 36 }),
  User: {
    connect: { id },
  },

  items: {
    create:
      options?.items ||
      Array.from({ length: 4 + Math.round(Math.random() * 6) }, () => ({
        image: faker.image.url({ width: 400, height: 200 }),
        title: faker.lorem.word({ length: { min: 1, max: 5 } }),
      })),
  },
});

const carsCollectionsImages = [
  "https://nuvomagazine.com/wp-content/uploads/2020/06/Cars-offered-from-The-Elkhart-Collection_Teddy-Pieper-%C2%A9-2019-Courtesy-of-RM-Sothebys-scaled.jpg",
  "https://www.reuters.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-2.images.arcpublishing.com%2Freuters%2FEUMB3X6CDFPNBMHMBGWITET6F4.jpg?auth=771c2e256a2988b6ffcb556be26208c3dddeab3b54f82b03fb4ac8ca711abe00&width=960&quality=80",
  "https://images.ctfassets.net/lym53uuylvg8/3CnBj781PthFwvmIQDLF60/fd64874447b2f3ae21414ccee71428ad/Collectig_Cars_among_fastest-growing_UK_companies__2_.jpg?fm=webp&w=1000&q=85",
];

const carsImages = [
  "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1440",
  "https://imageio.forbes.com/specials-images/imageserve/6064af8e13292f4369b15ae6/2021-Toyota-Supra/960x0.jpg?format=jpg&width=1440",
  "https://cdn.motor1.com/images/mgl/JO94P6/s1/most-expensive-cars-in-the-world.webp",
  "https://www.usnews.com/object/image/00000182-a537-dc41-a1db-a57f46460000/1_2021_bugatti_chiron_super_sport.jpg?update-time=&size=responsive970",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/250px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg",
];

const generateCarsCollection = (id) =>
  generateCollection(id, {
    image: carsCollectionsImages[Math.round(Math.random() * (carsCollectionsImages.length - 1))],
    title: "Cars Collection",
    category: "CARS",
    items: Array.from({ length: 4 + Math.round(Math.random() * 6) }, () => ({
      image: carsImages[Math.round(Math.random() * (carsImages.length - 1))],
      title: faker.vehicle.vehicle(),
    })),
  });

const paintingsCollectionImages = [
  "https://thewillardpagecollection.files.wordpress.com/2019/01/20190124_141819.jpg",
  "https://thewalters.org/wp-content/uploads/exhibition_collections.jpg",
  "https://www.parkwestgallery.com/wp-content/uploads/2017/01/GX3A1236-e1485447250211.jpg",
];
const generatePaintingsCollection = (id) =>
  generateCollection(id, {
    image: paintingsCollectionImages[Math.round(Math.random() * (paintingsCollectionImages.length - 1))],
    title: "Paintings Collection",
    category: "PAINTINGS",
  });

const generateCountsCollection = (id) =>
  generateCollection(id, {
    image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Coin_collection.jpg",
    title: "Couins Collection",
    category: "COINS",
  });

const generators = [generateCollection, generateCarsCollection, generatePaintingsCollection, generateCountsCollection];

const seedCollections = async () => {
  const users = await prisma.user.findMany({ where: { role: "USER" } });
  const promises = [];

  users.forEach(async (user) => {
    await prisma.collection.create({ data: generators[Math.round(Math.random() * (generators.length - 1))](user.id) });
    await prisma.collection.create({ data: generators[Math.round(Math.random() * (generators.length - 1))](user.id) });
  });
};

export default seedCollections;
