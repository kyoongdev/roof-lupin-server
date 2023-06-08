import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CurationRepository } from './curation.repository';
import { CreateCurationDTO, CurationDTO, UpdateCurationDTO } from './dto';
import { CurationException } from './exception/curation.exception';
import { CURATION_ERROR_CODE, CURATION_MUTATE_FORBIDDEN } from './exception/errorCode';

@Injectable()
export class CurationService {
  constructor(private readonly curationRepository: CurationRepository) {}

  async findCuration(id: string) {
    return await this.curationRepository.findCuration(id);
  }

  async findPagingCurations(paging: PagingDTO, args = {} as Prisma.CurationFindManyArgs) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.curationRepository.countCurations({
      where: args.where,
    });
    const curations = await this.curationRepository.findCurations({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<CurationDTO>(curations, { count, paging });
  }
  async createCuration(userId: string, data: CreateCurationDTO) {
    return await this.curationRepository.createCuration(userId, data);
  }

  async updateCuration(id: string, userId: string, data: UpdateCurationDTO) {
    const curation = await this.findCuration(id);

    if (curation.user.id !== userId) {
      throw new CurationException(CURATION_ERROR_CODE.FORBIDDEN(CURATION_MUTATE_FORBIDDEN));
    }

    await this.curationRepository.updateCuration(id, data);
  }

  async deleteCuration(id: string, userId: string) {
    const curation = await this.findCuration(id);

    if (curation.user.id !== userId) {
      throw new CurationException(CURATION_ERROR_CODE.FORBIDDEN(CURATION_MUTATE_FORBIDDEN));
    }

    await this.curationRepository.deleteCuration(id);
  }
}
