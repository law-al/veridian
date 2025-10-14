import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import category from './data';

const main = async () => {
  await prisma.category.createMany({
    data: category,
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
