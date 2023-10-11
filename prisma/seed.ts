// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const returnTrue75PercentOfTheTime = (): boolean => {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // If the random number is less than 0.75 (75%), return true; otherwise, return false
  return randomNumber < 0.75;
};

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // todo: make this a env variable
  const SEED_VALUE = 200;
  console.log(`Seeding ${SEED_VALUE} products on the local db`);
  for (let i = 0; i < SEED_VALUE; i++) {
    await prisma.product.create({
      data: {
        productID: faker.string.uuid(),
        isAvailable: returnTrue75PercentOfTheTime(),
        title: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        description: faker.commerce.productDescription(),
      },
    });
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
