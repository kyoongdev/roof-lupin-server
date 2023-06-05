//NOTE: 썸네일, Best유무, 가격, 위치,
export interface SpaceDTOProps {
  id: String;
  title: string;
  score: number;
  reviewCount: number;
  cost: number;
  isBest?: boolean;
  thumbnail: string;
  publicTransportation: any; //대중 교통
}

export class SpaceDTO {}
