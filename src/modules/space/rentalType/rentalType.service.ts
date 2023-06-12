import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { range } from 'lodash';

import { ReservationRepository } from '@/modules/reservation/reservation.repository';

import { PossibleRentalTypeQuery } from '../dto/query';
import { PossibleRentalTypesDTO, PossibleRentalTypesDTOProps, RentalTypeWithReservationDTO } from '../dto/rentalType';
import { PossibleTimeCostInfoDTOProps } from '../dto/timeCostInfo/possible-time-cost-info.dto';
import { SpaceRepository } from '../space.repository';

import { RentalTypeRepository } from './rentalType.repository';

@Injectable()
export class RentalTypeService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly rentalTypeRepository: RentalTypeRepository
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
    const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations(
      {
        where: {
          spaceId,
        },
      },
      {
        where: {
          year: query.year,
          month: query.month,
          day: query.day,
        },
      }
    );

    return this.getPossibleRentalTypesBySpaceId(rentalTypes);
  }

  async findPossibleRentalTypesBySpaces(query: PossibleRentalTypeQuery, args = {} as Prisma.SpaceFindManyArgs) {
    const rentalTypes = await this.rentalTypeRepository.findRentalTypesWithReservations(
      {
        where: {
          space: {
            ...args.where,
          },
        },
      },
      {
        where: {
          year: query.year,
          month: query.month,
          day: query.day,
        },
      }
    );
    return this.getPossibleRentalTypesBySpaceId(rentalTypes);
  }

  getPossibleRentalTypesBySpaceId(rentalTypes: RentalTypeWithReservationDTO[]) {
    const possibleRentalTypes = rentalTypes.reduce<PossibleRentalTypesDTOProps>(
      (acc, next) => {
        if (next.rentalType === '시간') {
          const timeCostInfos: PossibleTimeCostInfoDTOProps[] = range(0, 24).map((hour) => ({
            cost: 0,
            isPossible: false,
            time: hour,
          }));
          next.timeCostInfos.forEach((timeInfo) => {
            timeCostInfos[timeInfo.time].cost = timeInfo.cost;
            timeCostInfos[timeInfo.time].isPossible = true;
          });
          next.reservations.forEach((reservation) => {
            range(reservation.startAt, reservation.endAt).forEach((hour) => {
              timeCostInfos[hour].isPossible = false;
            });
          });

          acc.time.push({
            ...next,
            timeCostInfos,
          });
        } else if (next.rentalType === '패키지') {
          const isPossible = next.reservations.length === 0;
          acc.package.push({
            ...next,
            isPossible,
          });
        }

        return acc;
      },
      { time: [], package: [] }
    );
    return new PossibleRentalTypesDTO(possibleRentalTypes);
  }
}
