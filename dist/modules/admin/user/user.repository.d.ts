import type { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { AdminUpdateUserDTO, AdminUserDTO } from '../dto/user';
export declare class AdminUserRepository {
    private readonly database;
    constructor(database: PrismaService);
    findUsers(args?: Prisma.UserFindManyArgs): Promise<AdminUserDTO[]>;
    countUsers(args?: Prisma.UserCountArgs): Promise<number>;
    findUser(id: string): Promise<AdminUserDTO>;
    updateUser(id: string, data: AdminUpdateUserDTO): Promise<void>;
    hardDeleteUser(id: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
    restoreUser(id: string): Promise<void>;
}
