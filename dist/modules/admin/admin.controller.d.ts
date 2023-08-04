import { PagingDTO } from 'cumuco-nestjs';
import { RequestAdmin } from '@/interface/role.interface';
import { AdminService } from './admin.service';
import { AdminDTO, CheckAdminDTO, CreateAdminDTO, IsAdminCheckedDTO, UpdateAdminDTO, UpdateAdminPasswordDTO } from './dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAdmins(paging: PagingDTO): Promise<import("cumuco-nestjs").PaginationDTO<AdminDTO>>;
    getMe(user: RequestAdmin): Promise<AdminDTO>;
    getAdmin(adminId: string): Promise<AdminDTO>;
    createAdmin(data: CreateAdminDTO): Promise<string>;
    checkAdmin(data: CheckAdminDTO): Promise<IsAdminCheckedDTO>;
    resetAdminPassword(data: UpdateAdminPasswordDTO): Promise<void>;
    updateAdmin(adminId: string, data: UpdateAdminDTO): Promise<void>;
    deleteAdmin(adminId: string): Promise<void>;
    hardDeleteAdmin(adminId: string): Promise<void>;
}
