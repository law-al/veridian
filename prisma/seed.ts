import { PrismaClient } from '@/generated/prisma';
import { categorySeeds, tagSeeds, postSeeds } from './data';

const prisma = new PrismaClient();

interface Data {
  name: string;
  slug: string;
}

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (optional)
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Seed Categories
  console.log('📁 Seeding categories...');
  const categories = await Promise.all(
    categorySeeds.map((category) =>
      prisma.category.create({
        data: category,
      })
    )
  );
  console.log(`✅ Created ${categories.length} categories`);

  // Seed Tags
  console.log('🏷️  Seeding tags...');
  const tags = await Promise.all(
    tagSeeds.map((tag) =>
      prisma.tag.create({
        data: tag,
      })
    )
  );
  console.log(`✅ Created ${tags.length} tags`);

  // Seed PostList with relations
  console.log('📝 Seeding posts...');
  for (const postData of postSeeds) {
    const { categoryNames, tagNames, ...postFields } = postData;

    // Find category IDs
    const postCategories = await prisma.category.findMany({
      where: {
        name: {
          in: categoryNames,
        },
      },
    });

    // Find tag IDs
    const postTags = await prisma.tag.findMany({
      where: {
        name: {
          in: tagNames,
        },
      },
    });

    // Create post with relations
    await prisma.post.create({
      data: {
        ...postFields,
        categories: {
          connect: postCategories.map((cat) => ({ id: cat.id })),
        },
        tags: {
          connect: postTags.map((tag) => ({ id: tag.id })),
        },
      },
    });

    console.log(`  ✅ Created post: ${postFields.title}`);
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
