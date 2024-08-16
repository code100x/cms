import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding events...');

  try {
    await addClassesFromAugustToMay();
    console.log('Events seeded successfully!');
  } catch (error) {
    console.error('Error seeding events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

function toISTDate(date: Date): Date {
  return new Date(date.getTime());
}

export async function addClassesFromAugustToMay() {
  const startDate = new Date('2024-08-01T00:00:00+05:30');
  const endDate = new Date('2025-05-31T23:59:59+05:30');

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (date.getDay() === 5) {
      // Friday
      await prisma.event.create({
        data: {
          title: 'Web 3 Class',
          start: toISTDate(new Date(date.setHours(19, 30, 0, 0))),
          end: toISTDate(new Date(date.setHours(21, 30, 0, 0))),
        },
      });
    } else if (date.getDay() === 6 || date.getDay() === 0) {
      // Saturday or Sunday
      await prisma.event.create({
        data: {
          title: 'WebDevs/Devops Class',
          start: toISTDate(new Date(date.setHours(19, 30, 0, 0))),
          end: toISTDate(new Date(date.setHours(21, 30, 0, 0))),
        },
      });
    }
  }
}
