import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { categorySeeds, tagSeeds } from './data';

const main = async () => {
  await prisma.category.createMany({
    data: categorySeeds,
    skipDuplicates: true,
  });

  await prisma.tag.createMany({
    data: tagSeeds,
    skipDuplicates: true,
  });

  console.log('Database has been seeded');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
