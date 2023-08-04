import { PrismaClient, Space, User } from '@prisma/client';
export declare const seedSpace: (users: User[], database: PrismaClient) => Promise<Space[]>;
