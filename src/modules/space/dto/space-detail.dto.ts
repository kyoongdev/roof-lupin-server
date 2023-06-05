import { DateProps } from '@/common';
import { HostDTOProps } from '@/modules/host/dto';
import { ReviewDTO, ReviewDTOProps } from '@/modules/review/dto/review.dto';

import { SpaceDTO, type SpaceDTOProps } from './space.dto';

export interface SpaceDetailDTOProps extends SpaceDTOProps, DateProps {
  description: string;
  size: number;
  spaceType: number;
  buildingType: number;
  minUser: number;
  maxUser: number;
  overflowUserCost: number;
  overflowUserCount: number;
  host: HostDTOProps;
  reviews: ReviewDTOProps[];
  isLiked?: boolean;
}

export class SpaceDetailDTO extends SpaceDTO {}
