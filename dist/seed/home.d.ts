import { PrismaClient, Space } from '@prisma/client';
export declare const seedHome: (database: PrismaClient, spaces: Space[]) => Promise<void>;
