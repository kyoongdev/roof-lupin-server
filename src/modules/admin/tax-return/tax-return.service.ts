import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { CreateTaxReturnDTO, TaxReturnDTO, UpdateTaxReturnDTO } from '../dto/tax-return';

import { TaxReturnRepository } from './tax-return.repository';

@Injectable()
export class AdminTaxReturnService {
  constructor(private readonly taxReturnRepository: TaxReturnRepository) {}

  async findTaxReturn(id: string) {
    return await this.taxReturnRepository.findTaxReturn(id);
  }

  async findPagingTaxReturns(paging: PagingDTO, args = {} as Prisma.TaxReturnFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.taxReturnRepository.countTaxReturns({
      where: args.where,
    });
    const taxReturns = await this.taxReturnRepository.findTaxReturns({
      ...args,
      skip,
      take,
    });

    return new PaginationDTO<TaxReturnDTO>(taxReturns, { count, paging });
  }

  async createTaxReturn(data: CreateTaxReturnDTO) {
    return await this.taxReturnRepository.createTaxReturn(data);
  }

  async updateTaxReturn(id: string, data: UpdateTaxReturnDTO) {
    await this.findTaxReturn(id);
    await this.taxReturnRepository.updateTaxReturn(id, data);
  }

  async deleteTaxReturn(id: string) {
    await this.findTaxReturn(id);
    await this.taxReturnRepository.deleteTaxReturn(id);
    ``;
  }
}
