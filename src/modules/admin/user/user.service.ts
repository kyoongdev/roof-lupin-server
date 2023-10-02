import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { UpdateUserDTO } from '@/modules/user/dto';
import { USER_ERROR_CODE } from '@/modules/user/exception/errorCode';
import { UserException } from '@/modules/user/exception/user.exception';

import { AdminUserDTO, BlockUserDTO } from '../dto/user';

import { AdminUserRepository } from './user.repository';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: AdminUserRepository) {}

  async findUser(id: string) {
    return await this.userRepository.findUser(id);
  }

  async findPagingUsers(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.userRepository.countUsers({
      where: args.where,
    });
    const users = await this.userRepository.findUsers({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<AdminUserDTO>(users, { count, paging });
  }

  async updateUser(id: string, props: UpdateUserDTO) {
    await this.findUser(id);
    await this.userRepository.updateUser(id, props);
  }

  async blockUser(id: string, data: BlockUserDTO) {
    const user = await this.findUser(id);

    if (user.isBlocked) {
      throw new UserException(USER_ERROR_CODE.USER_ALREADY_BLOCKED);
    }

    await this.userRepository.updateUser(id, data);
  }

  async unBlockUser(id: string) {
    const user = await this.findUser(id);

    if (!user.isBlocked) {
      throw new UserException(USER_ERROR_CODE.USER_ALREADY_BLOCKED);
    }

    await this.userRepository.updateUser(id, {
      isBlocked: false,
      unBlockAt: null,
    });
  }

  async deleteUser(id: string) {
    await this.findUser(id);
    await this.userRepository.deleteUser(id);
  }

  async restoreUser(id: string) {
    await this.findUser(id);
    await this.userRepository.restoreUser(id);
  }

  async hardDeleteUser(id: string) {
    await this.findUser(id);
    await this.userRepository.hardDeleteUser(id);
  }
}
