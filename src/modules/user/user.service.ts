import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CommonUserDTO, CreateUserDTO, UpdateUserDTO } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(id: string) {
    const user = await this.userRepository.findUser(id);
    return new CommonUserDTO(user);
  }

  async findPagingUser(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const { count, rows } = await this.userRepository.findPagingUsers(paging, args);
    return new PaginationDTO(
      rows.map((user) => new CommonUserDTO(user)),
      { paging, count }
    );
  }

  async createUser(data: CreateUserDTO) {
    return await this.userRepository.createUser(data);
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    await this.findUser(id);
    await this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    await this.findUser(id);
    await this.userRepository.deleteUser(id);
  }
}
