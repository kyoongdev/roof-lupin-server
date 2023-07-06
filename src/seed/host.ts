import { range } from 'lodash';

import { EncryptProvider } from '@/common/encrypt';
import { PrismaService } from '@/database/prisma.service';

export const seedHosts = async (database: PrismaService) => {
  const encrypt = new EncryptProvider();
  const salt = encrypt.createSalt();
  const hostPassword = encrypt.hashPassword(salt, 'host1234');

  await Promise.all(
    range(1, 20).map(async (idx) => {
      await database.host.create({
        data: {
          name: `호스트 ${idx}`,
          email: `host${idx}@gmail.com`,
          gender: 1,
          phoneNumber: `01012341234`,
          password: hostPassword,
          salt,
        },
      });
    })
  );
};
