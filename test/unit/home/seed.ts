import { PrismaService } from '@/database/prisma.service';

export const seedHome = async (database: PrismaService) => {
  await database.homeImage.create({
    data: {
      id: 'default',
      url: 'test1',
      isDefault: true,
    },
  });
  await database.homeImage.create({
    data: {
      id: 'notDefault',
      url: 'test2',
      isDefault: false,
    },
  });
  await database.homeImage.create({
    data: {
      url: 'test3',
      isDefault: false,
    },
  });
  await database.homeImage.create({
    data: {
      url: 'test4',
      isDefault: false,
    },
  });

  await database.slogan.create({
    data: {
      id: 'default',
      content: 'test1',
      isDefault: true,
    },
  });
  await database.slogan.create({
    data: {
      id: 'notDefault',
      content: 'test2',
      isDefault: false,
    },
  });
  await database.slogan.create({
    data: {
      content: 'test3',
      isDefault: false,
    },
  });
  await database.slogan.create({
    data: {
      content: 'test4',
      isDefault: false,
    },
  });
};
