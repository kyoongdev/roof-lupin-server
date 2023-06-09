import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { SpaceDTO } from '@/modules/space/dto';
import { SpaceRepository } from '@/modules/space/space.repository';

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
}
