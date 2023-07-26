import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { SpaceDTO, UpdateSpaceDTO } from '@/modules/space/dto';
import { SpaceRepository } from '@/modules/space/space.repository';

import { UpdateSpaceOrderDTO } from '../dto/space';

@Injectable()
export class AdminSpaceService {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async findSpace(id: string) {
    return await this.spaceRepository.findSpace(id);
  }

  async findPagingSpaces(paging: PagingDTO, args = {} as Prisma.SpaceFindManyArgs) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.spaceRepository.countSpaces({
      where: args.where,
    });
    const spaces = await this.spaceRepository.findSpaces({
      ...args,
      where: args.where,
      skip,
      take,
    });
    return new PaginationDTO<SpaceDTO>(spaces, { count, paging });
  }

  async updateSpace(id: string, data: UpdateSpaceDTO) {
    await this.findSpace(id);
    await this.spaceRepository.updateSpace(id, data);
  }

  async updateSpaceOrder(id: string, data: UpdateSpaceOrderDTO) {
    await this.findSpace(id);
    await this.spaceRepository.updateSpaceOrder(id, data.orderNo);
  }

  async deleteSpaceOrder(id: string) {
    await this.findSpace(id);
    await this.spaceRepository.deleteSpaceOrder(id);
  }
}
