import { DateProps } from '@/common';
import { ImageDTO } from '@/modules/file/dto';
import { HostDTOProps } from '@/modules/host/dto';
import { ReviewDTO, ReviewDTOProps } from '@/modules/review/dto/review.dto';

import { RefundPolicyDTO, type RefundPolicyDTOProps } from './refund';
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
  isLiked?: boolean;
  isInterested?: boolean;
  host: HostDTOProps;
  reviews: ReviewDTOProps[];
  images: ImageDTO[];
  refundPolicies: RefundPolicyDTOProps[];
}

export class SpaceDetailDTO extends SpaceDTO {}
