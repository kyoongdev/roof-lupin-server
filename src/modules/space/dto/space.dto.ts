import { RentalType } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { CommonSpace } from '@/interface/space.interface';
import { LocationDTO, type LocationDTOProps } from '@/modules/location/dto';

import { TransportationDTO, type TransportationDTOProps } from './transportaion';

export interface SpaceDTOProps {
  id: string;
  title: string;
  averageScore: number;
  reviewCount: number;
  isInterested?: boolean;
  isImmediateReservation: boolean;
  isPublic: boolean;
  isApproved: boolean;
  thumbnail: string;
  hostId: string;
  startAt: string;
  endAt: string;
  publicTransportations?: TransportationDTOProps[]; //대중 교통
  location: LocationDTOProps;
  rentalType: RentalType[];
}

export class SpaceDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공간 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'number', description: '공간 평점' } })
  averageScore: number;

  @Property({ apiProperty: { type: 'number', description: '공간 리뷰 개수' } })
  reviewCount: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '공간 시간 최소 가격' } })
  timeCost: number | null;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '공간 패키지 최소 가격' } })
  packageCost: number | null;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '찜 여부' } })
  isInterested: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '노출 여부' } })
  isPublic: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isApproved: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '즉각 예약 여부' } })
  isImmediateReservation: boolean;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string', description: '운영 시작 시간' } })
  startAt: string;

  @Property({ apiProperty: { type: 'string', description: '운영 종료 시간' } })
  endAt: string;

  @Property({ apiProperty: { type: 'string', description: '호스트 id' } })
  hostId: string;

  @Property({ apiProperty: { type: TransportationDTO, isArray: true, nullable: true, description: '공간 대중 교통' } })
  publicTransportations: TransportationDTO[];

  @Property({ apiProperty: { type: LocationDTO, nullable: true, description: '공간 위치' } })
  location: LocationDTO | null;

  constructor(props: SpaceDTOProps) {
    const timeRentals = props.rentalType.filter((target) => target.rentalType === 1);
    const packageRentals = props.rentalType.filter((target) => target.rentalType === 2);
    this.id = props.id;
    this.title = props.title;
    this.averageScore = props.averageScore ? Number(props.averageScore.toFixed(1)) : 0;
    this.reviewCount = props.reviewCount ?? 0;
    this.hostId = props.hostId;
    this.isInterested = props.isInterested ?? false;
    this.isImmediateReservation = props.isImmediateReservation;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.isPublic = typeof props.isPublic === 'boolean' ? props.isPublic : props.isPublic === 1;
    this.isApproved = typeof props.isApproved === 'boolean' ? props.isApproved : props.isApproved === 1;
    this.thumbnail = props.thumbnail;
    this.publicTransportations = props.publicTransportations.map((target) => new TransportationDTO(target));
    this.location = props.location ? new LocationDTO(props.location) : null;
    this.timeCost = timeRentals.length === 0 ? null : Math.min(...timeRentals.map((target) => target.baseCost));
    this.packageCost =
      packageRentals.length === 0 ? null : Math.min(...packageRentals.map((target) => target.baseCost));
  }

  static generateSpaceDTO(space: CommonSpace, userId?: string): SpaceDTOProps {
    return {
      ...space,
      reviewCount: space.reviews.length,
      location: space.location,
      averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
      isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
    };
  }
}
