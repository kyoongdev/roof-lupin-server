import { PrismaClient } from '@prisma/client';

import { EncryptProvider } from '../../common/encrypt';

export const seedDatabase = async (database: PrismaClient) => {
  const admin = await database.admin.findFirst({});

  if (admin) return;

  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();

  const adminPassword = encrypt.hashPassword(salt, 'admin1234');
  await database.admin.create({
    data: {
      name: '통합관리자',
      password: adminPassword,
      salt,
      userId: 'admin',
      isAccepted: true,
    },
  });
};
