import { PrismaService } from '@/database/prisma.service';
export const seedDatabase = async (database: PrismaService) => {
  const isExist = await database.user.findFirst({
    where: {
      nickname: 'testUser',
    },
  });
  if (!isExist)
    await database.user.create({
      data: {
        nickname: 'testUser',
      },
    });
  // for (let i = 0; i < 100; i++) {
  //   await database.host.create({
  //     data: {
  //       userId: 'host' + i,
  //       name: 'asdf',
  //     },
  //   });
  // }
};
