import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CurationRepository } from '@/modules/curation/curation.repository';
import { CreateCurationSpaceDTO, CurationDTO } from '@/modules/curation/dto';
import { UpdateCurationSpaceDTO } from '@/modules/curation/dto/update-curation-space.dto';
import { CurationException } from '@/modules/curation/exception/curation.exception';
import { CURATION_ERROR_CODE } from '@/modules/curation/exception/errorCode';

import { AdminCreateCurationDTO, AdminUpdateCurationDTO, CurationCountDTO } from '../dto/curation';

@Injectable()
export class AdminCurationService {
  constructor(private readonly curationRepository: CurationRepository) {}
  async countCurations() {
    const count = await this.curationRepository.countCurations();
    return new CurationCountDTO({ count });
  }

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

  async createCuration(data: AdminCreateCurationDTO) {
    return await this.curationRepository.createCuration(data);
  }

  async createCurationSpace(curationId: string, data: CreateCurationSpaceDTO) {
    await this.findCuration(curationId);
    const isExist = await this.curationRepository.checkCurationSpace(curationId, data.spaceId);

    if (isExist) {
      throw new CurationException(CURATION_ERROR_CODE.CURATION_SPACE_ALREADY_EXIST);
    }

    await this.curationRepository.createCurationSpace(curationId, data);
  }

  async updateCuration(id: string, data: AdminUpdateCurationDTO) {
    await this.findCuration(id);
    await this.curationRepository.updateCuration(id, data);
  }

  async updateCurationSpace(curationId: string, data: UpdateCurationSpaceDTO) {
    await this.curationRepository.updateCurationSpace(curationId, data);
  }

  async updateCurationOrder(curation: string, orderNo: number) {
    await this.findCuration(curation);
    await this.curationRepository.updateCurationOrder(curation, orderNo);
  }

  async deleteCuration(id: string) {
    await this.curationRepository.deleteCuration(id);
  }

  async deleteCurationSpace(curationId: string, spaceId: string) {
    await this.curationRepository.deleteCurationSpace(curationId, spaceId);
  }
}
