import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { SettlementDTO } from './dto';
import { FindSettlementsQuery } from './dto/query';
import { SettlementRepository } from './settlement.repository';

@Injectable()
export class SettlementService {
  constructor(private readonly settlementRepository: SettlementRepository) {}

  async findSettlement(id: string) {
    return this.settlementRepository.findSettlement(id);
  }

  async findMySettlements(hostId: string, paging: PagingDTO, args = {} as Prisma.SettlementFindManyArgs) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.settlementRepository.countSettlements({
      where: args.where,
    });
    const settlements = await this.settlementRepository.findSettlements({
      where: {
        reservations: {
          some: {
            rentalType: {
              space: {
                hostId,
              },
            },
          },
        },
        ...args.where,
      },
      skip,
      take,
    });

    return new PaginationDTO<SettlementDTO>(settlements, { count, paging });
  }
}
