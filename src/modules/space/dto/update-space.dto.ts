import { Property } from 'wemacu-nestjs';

import { LocationDTO } from '@/modules/location/dto';

import { CreateSpaceCategoryDTO } from './category';
import { CreateCautionDTO } from './caution';
import { CreateSpaceDTOProps } from './create-space.dto';
import { CreateFacilityDTO } from './facility';
import { CreateHashtagDTO } from './hashtag';
import { CreateRefundPolicyDTO } from './refund';
import { CreateRentalTypeDTO } from './rentalType';
import { CreateServiceDTO } from './service';
import { CreateSizeDTO } from './size';
import { CreateTransportationDTO } from './transportaion';

export type UpdateSpaceDTOProps = Partial<CreateSpaceDTOProps>;

export class UpdateSpaceDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 제목' } })
  title?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 설명' } })
  description?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '공간 유형' } })
  spaceType?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '건물 유형' } })
  buildingType?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '썸네일' } })
  thumbnail?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '최소 인원' } })
  minUser?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '최대 인원' } })
  maxUser?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '초과 인원 당 추가 금액' } })
  overflowUserCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '초과 인원' } })
  overflowUserCount?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '생성된 이미지 id' } })
  images?: string[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '환불 정책' } })
  refundPolicies?: CreateRefundPolicyDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '주의 사항' } })
  cautions?: CreateCautionDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '대여 유형' } })
  rentalTypes?: CreateRentalTypeDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, description: '위치' } })
  location?: LocationDTO;

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '시설' } })
  facilities?: CreateFacilityDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '서비스' } })
  services?: CreateServiceDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '카테고리' } })
  categories?: CreateSpaceCategoryDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '해시태그' } })
  hashtags?: CreateHashtagDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '대중교통' } })
  publicTransportations?: CreateTransportationDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '면적' } })
  sizes?: CreateSizeDTO[];

  constructor(props?: UpdateSpaceDTOProps) {
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
      this.location = new LocationDTO(props.location);
      this.facilities = props.facilities.map((facility) => new CreateFacilityDTO(facility));
      this.services = props.services.map((service) => new CreateServiceDTO(service));
      this.categories = props.categories.map((category) => new CreateSpaceCategoryDTO(category));
      this.hashtags = props.hashtags.map((hashtag) => new CreateHashtagDTO(hashtag));
      this.publicTransportations = props.publicTransportations.map(
        (transportation) => new CreateTransportationDTO(transportation)
      );
      this.sizes = props.sizes.map((size) => new CreateSizeDTO(size));
    }
  }
}
