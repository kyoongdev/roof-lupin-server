import { Property } from 'wemacu-nestjs';

import { LocationDTO, type LocationDTOProps } from '@/modules/location/dto';

import { TransportationDTO, type TransportationDTOProps } from './transportaion';

export interface SpaceDTOProps {
  id: string;
  title: string;
  averageScore: number;
  reviewCount: number;
  cost: number;
  isBest?: boolean;
  thumbnail: string;
  publicTransportation?: TransportationDTOProps; //대중 교통
  location: LocationDTOProps;
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

  @Property({ apiProperty: { type: 'number', description: '공간 가격' } })
  cost: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '공간 베스트 여부' } })
  isBest: boolean | null;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: TransportationDTO, nullable: true, description: '공간 대중 교통' } })
  publicTransportation: TransportationDTO | null;

  @Property({ apiProperty: { type: LocationDTO, nullable: true, description: '공간 위치' } })
  location: LocationDTO | null;

  constructor(props: SpaceDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.averageScore = props.averageScore;
    this.reviewCount = props.reviewCount;
    this.cost = props.cost;
    this.isBest = typeof props.isBest === 'boolean' ? props.isBest : null;
    this.thumbnail = props.thumbnail;
    this.publicTransportation = props.publicTransportation ? new TransportationDTO(props.publicTransportation) : null;
    this.location = props.location ? new LocationDTO(props.location) : null;
  }
}
