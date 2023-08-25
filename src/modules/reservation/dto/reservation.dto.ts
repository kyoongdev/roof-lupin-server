import { Prisma } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { CheckIsTargetDay } from '@/interface/common.interface';
import type { CommonReservation } from '@/interface/reservation.interface';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { BaseReservationDTO, BaseReservationDTOProps } from './base-reservation.dto';
import { ReservationRentalTypeDTO, ReservationRentalTypeDTOProps } from './reservation-rental-type.dto';

export interface ReservationDTOProps extends BaseReservationDTOProps {
  user: CommonUserProps;
  rentalTypes: ReservationRentalTypeDTOProps[];
  space: SpaceDTOProps;
  isReviewed: boolean;
}

export class ReservationDTO extends BaseReservationDTO {
  @Property({ apiProperty: { type: CommonUserDTO, description: '유저 정보' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: ReservationRentalTypeDTO, isArray: true, description: '대여 정보' } })
  rentalTypes: ReservationRentalTypeDTO[];

  @Property({ apiProperty: { type: SpaceDTO, description: '공간 정보' } })
  space: SpaceDTO;

  @Property({ apiProperty: { type: 'boolean', description: '리뷰 작성 여부' } })
  isReviewed: boolean;

  constructor(props: ReservationDTOProps) {
    super(props);
    this.isReviewed = props.isReviewed;
    this.user = new CommonUserDTO(props.user);
    this.rentalTypes = props.rentalTypes.map((rentalType) => new ReservationRentalTypeDTO(rentalType));
    this.space = new SpaceDTO(props.space);
  }

  static generateReservationDTO(reservation: CommonReservation): ReservationDTOProps {
    const { rentalTypes, ...rest } = reservation;
    const { space } = rentalTypes[0].rentalType;

    return {
      ...rest,
      year: `${rest.year}`,
      month: `${rest.month}`,
      day: `${rest.day}`,
      user: rest.user,
      rentalTypes: rentalTypes.map((rentalType) => rentalType),
      space: SpaceDTO.generateSpaceDTO(space),
      isReviewed: reservation.spaceReviews ? reservation.spaceReviews.length > 0 : false,
    };
  }

  static generateReservationInclude(userId?: string) {
    return {
      user: true,
      rentalTypes: {
        include: {
          rentalType: {
            include: {
              timeCostInfos: true,
              space: {
                include: {
                  location: true,
                  reviews: true,
                  publicTransportations: true,
                  userInterests: true,
                  rentalType: true,
                  categories: {
                    include: {
                      category: {
                        include: {
                          icon: true,
                        },
                      },
                    },
                  },
                  reports: true,
                },
              },
              additionalServices: true,
            },
          },
        },
      },
      spaceReviews: userId
        ? {
            where: {
              userId,
            },
          }
        : true,
    };
  }

  checkIsTargetDay(targetDate: CheckIsTargetDay) {
    return targetDate.year === this.year && targetDate.month === this.month && targetDate.day === this.day;
  }
}
