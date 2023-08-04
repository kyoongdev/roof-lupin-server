import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { EncryptProvider } from '@/common/encrypt';
import { AdminRepository } from './admin.repository';
import { AdminDTO, CheckAdminDTO, CreateAdminDTO, IsAdminCheckedDTO, UpdateAdminDTO, UpdateAdminPasswordDTO } from './dto';
export declare class AdminService {
    private readonly adminRepository;
    private readonly encrypt;
    constructor(adminRepository: AdminRepository, encrypt: EncryptProvider);
    findAdmin(id: string): Promise<AdminDTO>;
    findPagingAdmins(paging: PagingDTO, args?: Prisma.AdminFindManyArgs): Promise<PaginationDTO<AdminDTO>>;
    checkAdminWithUserId(data: CheckAdminDTO): Promise<IsAdminCheckedDTO>;
    createAdmin(data: CreateAdminDTO, byAdmin?: boolean): Promise<string>;
    updateAdminPassword(data: UpdateAdminPasswordDTO): Promise<void>;
    updateAdmin(id: string, data: UpdateAdminDTO): Promise<void>;
    deleteAdmin(id: string): Promise<void>;
    hardDeleteAdmin(id: string): Promise<void>;
}
