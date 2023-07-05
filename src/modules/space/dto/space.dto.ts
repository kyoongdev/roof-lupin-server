import { RentalType } from '@prisma/client';
import { Property } from 'wemacu-nestjs';

import { LocationDTO, type LocationDTOProps } from '@/modules/location/dto';

import { TransportationDTO, type TransportationDTOProps } from './transportaion';

export interface SpaceDTOProps {
  id: string;
  title: string;
  averageScore: number;
  reviewCount: number;
  isBest?: boolean;
  isInterested?: boolean;
  isImmediateReservation: boolean;
  thumbnail: string;
  hostId: string;
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

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '공간 베스트 여부' } })
  isBest: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '찜 여부' } })
  isInterested: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '즉각 예약 여부' } })
  isImmediateReservation: boolean;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

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
    this.averageScore = props.averageScore;
    this.reviewCount = props.reviewCount;
    this.hostId = props.hostId;
    this.isBest = props.isBest ?? false;
    this.isInterested = props.isInterested ?? false;
    this.thumbnail = props.thumbnail;
    this.publicTransportations = props.publicTransportations.map((target) => new TransportationDTO(target));
    this.location = props.location ? new LocationDTO(props.location) : null;
    this.timeCost = timeRentals.length === 0 ? null : Math.min(...timeRentals.map((target) => target.baseCost));
    this.packageCost =
      packageRentals.length === 0 ? null : Math.min(...packageRentals.map((target) => target.baseCost));
  }
}
