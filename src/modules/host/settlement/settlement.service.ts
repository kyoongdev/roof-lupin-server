import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { SettlementDTO } from '../dto/settlement';

import { HostSettlementRepository } from './settlement.repository';

@Injectable()
export class HostSettlementService {
  constructor(private readonly settlementRepository: HostSettlementRepository) {}

  async findSettlement(id: string) {
    return this.settlementRepository.findSettlement(id);
  }

  async findSettlementMonth(hostId: string) {
    return await this.settlementRepository.findSettlementMonths({
      where: {
        hostId,
      },
    });
  }

  async findMySettlements(hostId: string, paging: PagingDTO, args = {} as Prisma.SettlementFindManyArgs) {
    const { skip, take } = paging.getSkipTake();

    const count = await this.settlementRepository.countSettlements({
      where: {
        ...args.where,
        deletedAt: null,
      },
    });
    const settlements = await this.settlementRepository.findSettlements({
      where: {
        ...args.where,
        deletedAt: null,
        reservations: {
          some: {
            rentalTypes: {
              some: {
                rentalType: {
                  space: {
                    hostId,
                  },
                },
              },
            },
          },
        },
      },
      skip,
      take,
    });

    return new PaginationDTO<SettlementDTO>(settlements, { count, paging });
  }
}
