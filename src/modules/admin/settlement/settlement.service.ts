import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';
import { CreateSettlementDTO, SettlementDTO, UpdateSettlementDTO } from '@/modules/settlement/dto';
import { SettlementRepository } from '@/modules/settlement/settlement.repository';

import { AdminException } from '../exception/admin.exception';
import { ADMIN_ERROR_CODE, ADMIN_SETTLEMENT_ALREADY_EXISTS } from '../exception/errorCode';

@Injectable()
export class AdminSettlementService {
  constructor(
    private readonly settlementRepository: SettlementRepository,
    private readonly reservationRepository: ReservationRepository
  ) {}

  async findSettlement(id: string) {
    return await this.settlementRepository.findSettlement(id);
  }

  async findPagingSettlements(paging: PagingDTO, args = {} as Prisma.SettlementFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.settlementRepository.countSettlements({
      where: args.where,
    });
    const settlements = await this.settlementRepository.findSettlements({
      where: args.where,
      skip,
      take,
    });
    return new PaginationDTO<SettlementDTO>(settlements, { count, paging });
  }

  async createSettlement(data: CreateSettlementDTO) {
    const isExist = await this.settlementRepository.checkSettlementByHostAndDate(
      data.year,
      data.month,
      data.day,
      data.hostId
    );

    if (isExist) {
      throw new AdminException(ADMIN_ERROR_CODE.CONFLICT(ADMIN_SETTLEMENT_ALREADY_EXISTS));
    }

    if (data.reservationIds) {
      await Promise.all(
        data.reservationIds.map(async (id) => {
          await this.reservationRepository.findReservation(id);
        })
      );
    }

    return await this.settlementRepository.createSettlement(data);
  }

  async updateSettlement(id: string, data: UpdateSettlementDTO) {
    await this.findSettlement(id);
    if (data.reservationIds) {
      await Promise.all(
        data.reservationIds.map(async (id) => {
          await this.reservationRepository.findReservation(id);
        })
      );
    }

    await this.settlementRepository.updateSettlement(id, data);
  }

  async deleteSettlement(id: string) {
    await this.findSettlement(id);
    await this.settlementRepository.deleteSettlement(id);
  }
}
