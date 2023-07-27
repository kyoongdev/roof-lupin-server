import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CommonUserDTO, CreateUserDTO, UpdateUserDTO } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(id: string) {
    return await this.userRepository.findUser(id);
  }

  async findMyPushToken(id: string) {
    return await this.userRepository.findUserPushToken(id);
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    await this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    await this.userRepository.deleteUser(id);
  }
}
