const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.property.createMany({
    data: [
      {
        title: "Beautiful Family House",
        description: "A beautiful family house with a large garden.",
        price: 500000,
        ownerId: 1, // Replace with actual owner ID
      },
      {
        title: "Modern Apartment",
        description: "A modern apartment in the city center.",
        price: 300000,
        ownerId: 1, // Replace with actual owner ID
      },
      {
        title: "Cozy Cottage",
        description: "A cozy cottage in the countryside.",
        price: 200000,
        ownerId: 1, // Replace with actual owner ID
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
