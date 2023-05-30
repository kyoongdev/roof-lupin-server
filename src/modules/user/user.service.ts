import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { CommonUserDTO, CreateUserDTO, UpdateUserDTO } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly database: PrismaService, private readonly userRepository: UserRepository) {}

  async findUser(id: string) {
    return await this.userRepository.findUser(id);
  }

  async findPagingUser(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.userRepository.countUsers({
      where: args.where,
    });
    const users = await this.userRepository.findUsers({
      where: {
        ...args.where,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      skip,
      take,
    });

    return new PaginationDTO<CommonUserDTO>(users, { paging, count });
  }

  async createUser(data: CreateUserDTO) {
    return await this.userRepository.createUser(data);
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    await this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    await this.userRepository.deleteUser(id);
  }

  async hardDeleteUser(id: string) {
    await this.userRepository.deleteUser(id);
  }
}
