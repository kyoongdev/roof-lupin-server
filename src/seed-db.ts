import { ConfigService } from '@nestjs/config';

import { PrismaClient } from '@prisma/client';

import { seedDatabase as seedDev } from './seed/dev';
import { seedDatabase as seedProd } from './seed/prod';

(async () => {
  const database = new PrismaClient();
  const configService = new ConfigService();
  console.log('NODE_ENV', configService.get('NODE_ENV'));

  // await seedDev(database);
})();
