import { PrismaService } from '@/database/prisma.service';
export const seedDatabase = async (database: PrismaService) => {
  for (let i = 0; i < 100; i++) {
    await database.host.create({
      data: {
        userId: 'host' + i,
        name: 'asdf',
      },
    });
  }
};
