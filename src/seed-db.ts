import { ConfigService } from '@nestjs/config';

import { PrismaClient } from '@prisma/client';

import { seedDatabase as seedDev } from './seed/dev';
import { seedDatabase as seedProd } from './seed/prod';

(async () => {
  const database = new PrismaClient();
  const configService = new ConfigService();

  configService.get('NODE_ENV') !== 'prod' ? await seedProd(database) : await seedDev(database);
})();
