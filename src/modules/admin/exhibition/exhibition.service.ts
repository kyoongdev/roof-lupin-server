import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { CreateExhibitionDTO, ExhibitionDTO, UpdateExhibitionDTO } from '@/modules/exhibition/dto';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';

@Injectable()
export class AdminExhibitionService {
  constructor(private readonly exhibitionRepository: ExhibitionRepository) {}

  async findExhibition(id: string) {
    return await this.exhibitionRepository.findExhibition(id);
  }

  async findPagingExhibitions(paging: PagingDTO, args = {} as Prisma.ExhibitionFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.exhibitionRepository.countExhibitions({
      where: args.where,
    });
    const exhibitions = await this.exhibitionRepository.findExhibitions({
      where: args.where,
      skip,
      take,
    });

    return new PaginationDTO<ExhibitionDTO>(exhibitions, { paging, count });
  }

  async createExhibition(data: CreateExhibitionDTO) {
    return await this.exhibitionRepository.createExhibition(data);
  }

  async updateExhibition(id: string, data: UpdateExhibitionDTO) {
    await this.findExhibition(id);
    await this.exhibitionRepository.updateExhibition(id, data);
  }

  async deleteExhibition(id: string) {
    await this.findExhibition(id);
    await this.exhibitionRepository.deleteExhibition(id);
  }
}
