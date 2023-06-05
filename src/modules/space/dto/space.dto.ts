import { Property } from 'wemacu-nestjs';

import { type TransportationDTOProps } from './transportaion';

export interface SpaceDTOProps {
  id: string;
  title: string;
  score: number;
  reviewCount: number;
  cost: number;
  isBest?: boolean;
  thumbnail: string;
  publicTransportation: TransportationDTOProps; //대중 교통
}

export class SpaceDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공간 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'number', description: '공간 평점' } })
  score: number;

  // constructor(props: SpaceDTOProps) {}
}
