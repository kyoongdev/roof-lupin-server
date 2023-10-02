import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CurationRepository } from './curation.repository';
import { CreateCurationDTO, CurationDTO, UpdateCurationDTO } from './dto';
import { CurationException } from './exception/curation.exception';
import { CURATION_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class CurationService {
  constructor(private readonly curationRepository: CurationRepository) {}

  async findCuration(id: string) {
    return await this.curationRepository.findCuration(id);
  }
  async findCurations(args = {} as Prisma.CurationFindManyArgs) {
    return await this.curationRepository.findCurations({
      ...args,
      where: {
        ...args.where,
        deletedAt: null,
      },
    });
  }

  async findPagingCurations(paging: PagingDTO, args = {} as Prisma.CurationFindManyArgs) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.curationRepository.countCurations({
      where: {
        ...args.where,
        deletedAt: null,
      },
    });
    const curations = await this.curationRepository.findCurations({
      ...args,
      where: {
        ...args.where,
        deletedAt: null,
      },
      skip,
      take,
    });

    return new PaginationDTO<CurationDTO>(curations, { count, paging });
  }
  async createCuration(data: CreateCurationDTO, userId?: string) {
    return await this.curationRepository.createCuration(data, userId);
  }

  async updateCuration(id: string, data: UpdateCurationDTO, userId?: string) {
    const curation = await this.findCuration(id);

    if (userId && curation.user.id !== userId) {
      throw new CurationException(CURATION_ERROR_CODE.CURATION_MUTATE_FORBIDDEN);
    }

    await this.curationRepository.updateCuration(id, data);
  }

  async deleteCuration(id: string, userId?: string) {
    const curation = await this.findCuration(id);

    if (userId && curation.user.id !== userId) {
      throw new CurationException(CURATION_ERROR_CODE.CURATION_MUTATE_FORBIDDEN);
    }

    await this.curationRepository.deleteCuration(id);
  }
}
