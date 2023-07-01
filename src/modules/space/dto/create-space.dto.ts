import { Property } from 'wemacu-nestjs';

import { CreateLocationDTO, CreateLocationDTOProps } from '@/modules/location/dto';

import { CreateAdditionalServiceDTO, CreateAdditionalServiceDTOProps } from './additionalService';
import { CreateSpaceCategoryDTO, type CreateSpaceCategoryDTOProps } from './category';
import { CreateCautionDTO, type CreateCautionDTOProps } from './caution';
import { CreateBuildingDTO, type CreateBuildingDTOProps } from './facility';
import { CreateHashtagDTO, type CreateHashtagDTOProps } from './hashtag';
import { CreateRefundPolicyDTO, type CreateRefundPolicyDTOProps } from './refund';
import { CreateRentalTypeDTO, type CreateRentalTypeDTOProps } from './rentalType';
import { CreateServiceDTO, type CreateServiceDTOProps } from './service';
import { CreateSizeDTO, type CreateSizeDTOProps } from './size';
import { CreateTransportationDTO, type CreateTransportationDTOProps } from './transportaion';

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
  location: CreateLocationDTOProps;
  buildings: CreateBuildingDTOProps[];
  services: CreateServiceDTOProps[];
  categories: CreateSpaceCategoryDTOProps[];
  hashtags: CreateHashtagDTOProps[];
  publicTransportations: CreateTransportationDTOProps[];
  sizes: CreateSizeDTOProps[];
  additionalServices: CreateAdditionalServiceDTOProps[];
}

export class CreateSpaceDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '공간 설명' } })
  description: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '공간 유형' } })
  spaceType?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '건물 유형' } })
  buildingType?: number;

  @Property({ apiProperty: { type: 'string', description: '썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'number', description: '최소 인원' } })
  minUser: number;

  @Property({ apiProperty: { type: 'number', description: '최대 인원' } })
  maxUser: number;

  @Property({ apiProperty: { type: 'number', description: '초과 인원 당 추가 금액' } })
  overflowUserCost: number;

  @Property({ apiProperty: { type: 'number', description: '초과 인원' } })
  overflowUserCount: number;

  @Property({ apiProperty: { type: 'string', isArray: true, description: '생성된 이미지 url' } })
  images: string[];

  @Property({ apiProperty: { type: CreateRefundPolicyDTO, isArray: true, description: '환불 정책' } })
  refundPolicies?: CreateRefundPolicyDTO[];

  @Property({ apiProperty: { type: CreateCautionDTO, isArray: true, description: '주의 사항' } })
  cautions: CreateCautionDTO[];

  @Property({ apiProperty: { type: CreateRentalTypeDTO, isArray: true, description: '대여 유형' } })
  rentalTypes: CreateRentalTypeDTO[];

  @Property({ apiProperty: { type: CreateLocationDTO, description: '위치' } })
  location: CreateLocationDTO;

  @Property({ apiProperty: { type: CreateBuildingDTO, isArray: true, description: '시설' } })
  buildings: CreateBuildingDTO[];

  @Property({ apiProperty: { type: CreateServiceDTO, isArray: true, description: '서비스' } })
  services: CreateServiceDTO[];

  @Property({ apiProperty: { type: CreateSpaceCategoryDTO, isArray: true, description: '카테고리' } })
  categories: CreateSpaceCategoryDTO[];

  @Property({ apiProperty: { type: CreateHashtagDTO, isArray: true, description: '해시태그' } })
  hashtags: CreateHashtagDTO[];

  @Property({ apiProperty: { type: CreateTransportationDTO, isArray: true, description: '대중교통' } })
  publicTransportations: CreateTransportationDTO[];

  @Property({ apiProperty: { type: CreateSizeDTO, isArray: true, description: '면적' } })
  sizes: CreateSizeDTO[];

  @Property({ apiProperty: { type: CreateAdditionalServiceDTO, isArray: true, description: '추가 서비스' } })
  additionalServices: CreateAdditionalServiceDTO[];

  constructor(props?: CreateSpaceDTOProps) {
    if (props) {
      this.title = props.title;
      this.description = props.description;
      this.spaceType = props.spaceType;
      this.buildingType = props.buildingType;
      this.thumbnail = props.thumbnail;
      this.minUser = props.minUser;
      this.maxUser = props.maxUser;
      this.overflowUserCost = props.overflowUserCost;
      this.overflowUserCount = props.overflowUserCount;
      this.images = props.images;
      this.refundPolicies = props.refundPolicies;
      this.cautions = props.cautions;
      this.rentalTypes = props.rentalTypes.map((rentalType) => new CreateRentalTypeDTO(rentalType));
      this.location = new CreateLocationDTO(props.location);
      this.buildings = props.buildings.map((facility) => new CreateBuildingDTO(facility));
      this.services = props.services.map((service) => new CreateServiceDTO(service));
      this.categories = props.categories.map((category) => new CreateSpaceCategoryDTO(category));
      this.hashtags = props.hashtags.map((hashtag) => new CreateHashtagDTO(hashtag));
      this.publicTransportations = props.publicTransportations.map(
        (transportation) => new CreateTransportationDTO(transportation)
      );
      this.sizes = props.sizes.map((size) => new CreateSizeDTO(size));
      this.additionalServices = props.additionalServices.map(
        (additionalService) => new CreateAdditionalServiceDTO(additionalService)
      );
    }
  }
}
