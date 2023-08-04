import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';
import { UpdateUserDTO } from '@/modules/user/dto';
import { AdminUserDTO, BlockUserDTO } from '../dto/user';
import { AdminUserRepository } from './user.repository';
export declare class AdminUserService {
    private readonly userRepository;
    constructor(userRepository: AdminUserRepository);
    findUser(id: string): Promise<AdminUserDTO>;
    findPagingUsers(paging: PagingDTO, args?: Prisma.UserFindManyArgs): Promise<PaginationDTO<AdminUserDTO>>;
    updateUser(id: string, props: UpdateUserDTO): Promise<void>;
    blockUser(id: string, data: BlockUserDTO): Promise<void>;
    unBlockUser(id: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
    restoreUser(id: string): Promise<void>;
    hardDeleteUser(id: string): Promise<void>;
}
