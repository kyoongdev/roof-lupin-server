import { Property } from 'wemacu-nestjs';

import { LocationDTO, type LocationDTOProps } from '@/modules/location/dto';

import { TransportationDTO, type TransportationDTOProps } from './transportaion';

export interface SpaceDTOProps {
  id: string;
  title: string;
  score: number;
  reviewCount: number;
  cost: number;
  isBest?: boolean;
  thumbnail: string;
  publicTransportation: TransportationDTOProps; //대중 교통
  location: LocationDTOProps;
}

export class SpaceDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공간 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'number', description: '공간 평점' } })
  score: number;

  @Property({ apiProperty: { type: 'number', description: '공간 리뷰 개수' } })
  reviewCount: number;

  @Property({ apiProperty: { type: 'number', description: '공간 가격' } })
  cost: number;

  @Property({ apiProperty: { type: 'boolean', description: '공간 베스트 여부' } })
  isBest?: boolean;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: TransportationDTO, description: '공간 대중 교통' } })
  publicTransportation: TransportationDTO;

  @Property({ apiProperty: { type: LocationDTO, description: '공간 위치' } })
  location: LocationDTO;

  constructor(props: SpaceDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.score = props.score;
    this.reviewCount = props.reviewCount;
    this.cost = props.cost;
    this.isBest = props.isBest;
    this.thumbnail = props.thumbnail;
    this.publicTransportation = new TransportationDTO(props.publicTransportation);
    this.location = new LocationDTO(props.location);
  }
}
