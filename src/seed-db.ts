import { PrismaClient } from '@prisma/client';

import { seedDatabase } from './seed';

(async () => {
  const database = new PrismaClient();
  await seedDatabase(database);
})();
