import type { Prisma } from '@prisma/client';
import { EncryptProvider } from '@/common/encrypt';
import { PrismaService } from '@/database/prisma.service';
import { AdminDetailDTO, AdminDTO, UpdateAdminDTO } from './dto';
import { CreateAdminDTO } from './dto/create-admin.dto';
export declare class AdminRepository {
    private readonly database;
    private readonly encrypt;
    constructor(database: PrismaService, encrypt: EncryptProvider);
    findAdmins(args?: Prisma.AdminFindManyArgs): Promise<AdminDTO[]>;
    countAdmins(args?: Prisma.AdminCountArgs): Promise<number>;
    findAdmin(id: string): Promise<AdminDTO>;
    findAdminDetail(id: string): Promise<AdminDetailDTO>;
    findAdminByUserId(userId: string): Promise<AdminDetailDTO>;
    checkAdminByUserId(userId: string): Promise<false | AdminDetailDTO>;
    createAdmin(data: CreateAdminDTO, byAdmin?: boolean): Promise<string>;
    updateAdmin(id: string, data: UpdateAdminDTO): Promise<void>;
    deleteAdmin(id: string): Promise<void>;
    hardDeleteAdmin(id: string): Promise<void>;
}
