import { Property } from 'wemacu-nestjs';

import { type DateProps } from '@/common';
import { ImageDTO } from '@/modules/file/dto';
import { HostDTO, type HostDTOProps } from '@/modules/host/dto';
import { LocationDTO, LocationDTOProps } from '@/modules/location/dto';
import { ReviewDTO, ReviewDTOProps } from '@/modules/review/dto/review.dto';

import { SpaceCategoryDTO, SpaceCategoryDTOProps } from './category';
import { CautionDTO, type CautionDTOProps } from './caution';
import { BuildingDTO, type BuildingDTOProps } from './facility';
import { HashtagDTO, HashtagDTOProps } from './hashtag';
import { RefundPolicyDTO, type RefundPolicyDTOProps } from './refund';
import { ServiceDTO, ServiceDTOProps } from './service';
import { SizeDTO, SizeDTOProps } from './size';
import { TransportationDTO, TransportationDTOProps } from './transportaion';

export interface SpaceDetailDTOProps extends DateProps {
  id: string;
  title: string;
  averageScore: number;
  reviewCount: number;
  isBest?: boolean;
  thumbnail: string;
  location: LocationDTOProps;
  description: string;
  minSize: number;
  buildingType: number;
  minUser: number;
  maxUser: number;
  overflowUserCost: number;
  overflowUserCount: number;
  qnaCount: number;
  isInterested?: boolean;
  host: HostDTOProps;
  reviews: ReviewDTOProps[];
  images: ImageDTO[];
  refundPolicies: RefundPolicyDTOProps[];
  cautions: CautionDTOProps[];
  buildings: BuildingDTOProps[];
  services: ServiceDTOProps[];
  categories: SpaceCategoryDTOProps[];
  hashtags: HashtagDTOProps[];
  publicTransportations: TransportationDTOProps[];
  sizes: SizeDTOProps[];
}

export class SpaceDetailDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '공간 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'number', description: '공간 평점' } })
  averageScore: number;

  @Property({ apiProperty: { type: 'number', description: '공간 리뷰 개수' } })
  reviewCount: number;

  @Property({ apiProperty: { type: 'boolean', description: '공간 베스트 여부' } })
  isBest?: boolean;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: LocationDTO, description: '공간 위치', nullable: true } })
  location?: LocationDTO;

  @Property({ apiProperty: { type: 'string', description: '공간 설명' } })
  description: string;

  @Property({ apiProperty: { type: 'number', description: '공간 최소 크기' } })
  minSize: number;

  @Property({ apiProperty: { type: 'number', description: '건물 타입', nullable: true } })
  buildingType?: number;

  @Property({ apiProperty: { type: 'number', description: '공간 최소 인원' } })
  minUser: number;

  @Property({ apiProperty: { type: 'number', description: '공간 최대 인원' } })
  maxUser: number;

  @Property({ apiProperty: { type: 'number', description: '초과 인원 당 추가 금액' } })
  overflowUserCost: number;

  @Property({ apiProperty: { type: 'number', description: '초과 인원' } })
  overflowUserCount: number;

  @Property({ apiProperty: { type: 'number', description: '공간 Q&A 개수' } })
  qnaCount: number;

  @Property({ apiProperty: { type: 'boolean', description: '찜 여부' } })
  isInterested: boolean;

  @Property({ apiProperty: { type: HostDTO, description: '호스트 정보' } })
  host: HostDTO;

  @Property({ apiProperty: { type: ReviewDTO, isArray: true, description: '리뷰 목록' } })
  reviews: ReviewDTO[];

  @Property({ apiProperty: { type: ImageDTO, isArray: true, description: '공간 이미지 목록' } })
  images: ImageDTO[];

  @Property({ apiProperty: { type: RefundPolicyDTO, isArray: true, description: '환불 정책 목록' } })
  refundPolicies: RefundPolicyDTO[];

  @Property({ apiProperty: { type: CautionDTO, isArray: true, description: '주의 사항 목록' } })
  cautions: CautionDTO[];

  @Property({ apiProperty: { type: BuildingDTO, isArray: true, description: '시설 목록' } })
  buildings: BuildingDTO[];

  @Property({ apiProperty: { type: ServiceDTO, isArray: true, description: '서비스 목록' } })
  services: ServiceDTO[];

  @Property({ apiProperty: { type: SpaceCategoryDTO, isArray: true, description: '공간 카테고리 목록' } })
  categories: SpaceCategoryDTO[];

  @Property({ apiProperty: { type: HashtagDTO, isArray: true, description: '해시태그 목록' } })
  hashtags: HashtagDTO[];

  @Property({ apiProperty: { type: TransportationDTO, isArray: true, description: '대중교통 목록' } })
  publicTransportations: TransportationDTO[];

  @Property({ apiProperty: { type: SizeDTO, isArray: true, description: '공간 크기 목록' } })
  sizes: SizeDTO[];

  constructor(props: SpaceDetailDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.averageScore = props.averageScore;
    this.reviewCount = props.reviewCount;
    this.isBest = props.isBest ?? false;
    this.thumbnail = props.thumbnail;
    this.location = props.location ? new LocationDTO(props.location) : null;
    this.description = props.description;
    this.minSize = props.minSize;
    this.buildingType = props.buildingType ?? null;
    this.minUser = props.minUser;
    this.maxUser = props.maxUser;
    this.overflowUserCost = props.overflowUserCost;
    this.overflowUserCount = props.overflowUserCount;
    this.qnaCount = props.qnaCount;
    this.isInterested = props.isInterested ?? false;
    this.host = new HostDTO(props.host);
    this.images = props.images.map((image) => new ImageDTO(image));
    this.refundPolicies = props.refundPolicies.map((refundPolicy) => new RefundPolicyDTO(refundPolicy));
    this.cautions = props.cautions.map((caution) => new CautionDTO(caution));
    this.buildings = props.buildings.map((building) => new BuildingDTO(building));
    this.services = props.services.map((service) => new ServiceDTO(service));
    this.categories = props.categories.map((category) => new SpaceCategoryDTO(category));
    this.hashtags = props.hashtags.map((hashtag) => new HashtagDTO(hashtag));
    this.publicTransportations = props.publicTransportations.map(
      (publicTransportation) => new TransportationDTO(publicTransportation)
    );
    this.reviews = props.reviews.map((review) => new ReviewDTO(review));
    this.sizes = props.sizes.map((size) => new SizeDTO(size));
  }
}
