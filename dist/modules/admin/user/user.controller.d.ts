import { PagingDTO } from 'cumuco-nestjs';
import { IdsDTO } from '@/common';
import { FindUsersQuery } from '@/modules/user/dto/query';
import { AdminUpdateUserDTO, AdminUserDTO, BlockUserDTO } from '../dto/user';
import { AdminUserService } from './user.service';
export declare class AdminUserController {
    private readonly userService;
    constructor(userService: AdminUserService);
    findUser(id: string): Promise<AdminUserDTO>;
    findPagingUsers(paging: PagingDTO, query: FindUsersQuery): Promise<import("cumuco-nestjs").PaginationDTO<AdminUserDTO>>;
    updateUser(id: string, body: AdminUpdateUserDTO): Promise<void>;
    blockUser(id: string, body: BlockUserDTO): Promise<void>;
    unBlockUser(id: string): Promise<void>;
    restoreUser(id: string): Promise<void>;
    deleteUsers(query: IdsDTO): Promise<void>;
    deleteUser(id: string): Promise<void>;
    hardDeleteUser(id: string): Promise<void>;
}
