import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { ExhibitionDTO } from './dto';
import { ExhibitionRepository } from './exhibition.repository';

@Injectable()
export class ExhibitionService {
  constructor(private readonly exhibitionRepository: ExhibitionRepository) {}

  async findExhibition(id: string, userId?: string) {
    return this.exhibitionRepository.findExhibition(id, userId);
  }

  async findPagingExhibitions(paging: PagingDTO, args = {} as Prisma.ExhibitionFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.exhibitionRepository.countExhibitions({
      where: {
        ...args.where,
        deletedAt: null,
      },
    });
    const exhibitions = await this.exhibitionRepository.findExhibitions({
      ...args,
      where: {
        ...args.where,
        deletedAt: null,
      },
      skip,
      take,
    });
    return new PaginationDTO<ExhibitionDTO>(exhibitions, { paging, count });
  }
}
