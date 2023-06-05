import { LocationDTOProps } from '@/modules/location/dto';

import { CreateSpaceCategoryDTOProps } from './category';
import { CreateCautionDTO, CreateCautionDTOProps } from './caution';
import { CreateFacilityDTOProps } from './facility';
import { CreateHashtagDTO, CreateHashtagDTOProps } from './hashtag';
import { CreateRefundPolicyDTOProps } from './refund';
import { CreateRentalTypeDTOProps } from './rentalType';
import { CreateServiceDTOProps } from './service';
import { CreateTransportationDTOProps } from './transportaion';

export interface CreateSpaceDTOProps {
  title: string;
  description: string;
  spaceType?: number;
  buildingType?: number;
  thumbnail: string;
  minUser: number;
  maxUser: number;
  overflowUserCost: number;
  overflowUserCount: number;
  images: string[];
  refundPolicies: CreateRefundPolicyDTOProps[];
  cautions: CreateCautionDTOProps[];
  rentalTypes: CreateRentalTypeDTOProps[];
  location: LocationDTOProps;
  facilities: CreateFacilityDTOProps[];
  services: CreateServiceDTOProps[];
  categories: CreateSpaceCategoryDTOProps[];
  hashtags: CreateHashtagDTOProps[];
  publicTransportations: CreateTransportationDTOProps[];
}

export class CreateSpaceDTO {}
