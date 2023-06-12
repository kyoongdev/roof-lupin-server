import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { range } from 'lodash-es';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { PossibleRentalTypeQuery } from '../dto/query';
import { PossibleRentalTypesDTO, PossibleRentalTypesDTOProps } from '../dto/rentalType';
import { PossibleTimeCostInfoDTOProps } from '../dto/timeCostInfo/possible-time-cost-info.dto';
import { SpaceRepository } from '../space.repository';

import { RentalTypeRepository } from './rentalType.repository';

@Injectable()
export class RentalTypeService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly reservationRepository: ReservationRepository
  ) {}

  async findSpaceRentalTypes(spaceId: string, args = {} as Prisma.RentalTypeFindManyArgs) {
    return await this.rentalTypeRepository.findRentalTypes({
      where: {
        spaceId,
        ...args.where,
      },
    });
  }

  async findSpaceRentalTypeDetail(spaceId: string) {
    return await this.rentalTypeRepository.findSpaceRentalTypeDetail(spaceId);
  }

  async findPossibleRentalTypesBySpaceId(spaceId: string, query: PossibleRentalTypeQuery) {
    await this.spaceRepository.findSpace(spaceId);
    const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations({
      where: {
        spaceId,
        reservations: {
          some: {
            year: query.year,
            month: query.month,
            day: query.day,
          },
        },
      },
    });
    return rentalTypes.reduce<PossibleRentalTypesDTO>(
      (acc, next) => {
        if (next.rentalType === '시간') {
          const timeCostInfos: PossibleTimeCostInfoDTOProps[] = range(0, 24).map((hour) => ({
            cost: 0,
            isPossible: true,
            time: hour,
          }));
          next.timeCostInfos.forEach((timeInfo) => {
            timeCostInfos[timeInfo.time].cost = timeInfo.cost;
          });
          next.reservations.forEach((reservation) => {
            range(reservation.startAt, reservation.endAt).forEach((hour) => {
              timeCostInfos[hour].isPossible = false;
            });
          });

          acc.time.push({
            id: next.id,
            name: next.name,
            baseCost: next.baseCost,
            rentalType: next.rentalType,
            baseHour: next.baseHour,
            endAt: next.endAt,
            startAt: next.startAt,
            timeCostInfos,
          });
        } else if (next.rentalType === '패키지') {
          const isPossible = next.reservations.length === 0;
          acc.package.push({
            id: next.id,
            name: next.name,
            baseCost: next.baseCost,
            rentalType: next.rentalType,
            baseHour: next.baseHour,
            endAt: next.endAt,
            startAt: next.startAt,
            isPossible,
          });
        }

        return acc;
      },
      { time: [], package: [] }
    );
  }
}
