import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CurationRepository } from '@/modules/curation/curation.repository';
import { CurationDTO } from '@/modules/curation/dto';

import { AdminUpdateCurationDTO } from '../dto/curation';

@Injectable()
export class AdminCurationService {
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
      where: args.where,
      skip,

      take,
    });

    return new PaginationDTO<CurationDTO>(curations, { count, paging });
  }

  async updateCuration(id: string, data: AdminUpdateCurationDTO) {
    await this.findCuration(id);
    await this.curationRepository.updateCuration(id, data);
  }

  async deleteCuration(id: string) {
    await this.findCuration(id);
    await this.curationRepository.deleteCuration(id);
  }
}
