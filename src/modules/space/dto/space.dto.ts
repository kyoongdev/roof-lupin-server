import { RentalType } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { CategoryInclude } from '@/interface/category.interface';
import { CommonSpace } from '@/interface/space.interface';
import { LocationDTO, type LocationDTOProps } from '@/modules/location/dto';

import { SpaceCategoryDTO, SpaceCategoryDTOProps } from './category';
import { RefundPolicyDTO, RefundPolicyDTOProps } from './refund';
import { TransportationDTO, type TransportationDTOProps } from './transportaion';

export interface SpaceDTOProps {
  id: string;
  title: string;
  averageScore: number;
  reviewCount: number;
  isInterested?: boolean;
  interestCount: number;
  isImmediateReservation: boolean;
  isPublic: boolean;
  isApproved: boolean;
  isRoofOnly: boolean;
  thumbnail: string;
  reportCount: number;
  hostId: string;
  publicTransportations?: TransportationDTOProps[]; //대중 교통
  location: LocationDTOProps;
  rentalType: RentalType[];
  categories: SpaceCategoryDTOProps[];
  orderNo: number;
  overflowUserCost: number;
  overflowUserCount: number;
  refundPolicies: RefundPolicyDTOProps[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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

  @Property({ apiProperty: { type: 'number', description: '공간 신고 개수' } })
  reportCount: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '공간 시간 최소 가격' } })
  timeCost: number | null;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '공간 패키지 최소 가격' } })
  packageCost: number | null;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '찜 여부' } })
  isInterested: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '노출 여부' } })
  isPublic: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isApproved: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '옥상 유일 여부' } })
  isRoofOnly: boolean;

  @Property({ apiProperty: { type: 'number', description: '찜 개수' } })
  interestCount: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '즉각 예약 여부' } })
  isImmediateReservation: boolean;

  @Property({ apiProperty: { type: 'string', description: '공간 썸네일' } })
  thumbnail: string;

  @Property({ apiProperty: { type: 'string', description: '호스트 id' } })
  hostId: string;

  @Property({ apiProperty: { type: TransportationDTO, isArray: true, nullable: true, description: '공간 대중 교통' } })
  publicTransportations: TransportationDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 위치' } })
  location: LocationDTO | null;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '공간 순서' } })
  orderNo?: number;

  @Property({ apiProperty: { type: SpaceCategoryDTO, isArray: true, description: '공간이 속한 카테고리' } })
  categories?: SpaceCategoryDTO[];

  @Property({ apiProperty: { type: 'number', description: '초과 사용자 비용' } })
  overflowUserCost: number;

  @Property({ apiProperty: { type: 'number', description: '초과 사용자 수' } })
  overflowUserCount: number;

  @Property({ apiProperty: { type: RefundPolicyDTO, isArray: true, description: '환불 정책' } })
  refundPolicies: RefundPolicyDTO[];

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '수정일' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '삭제일' } })
  deletedAt: Date;

  constructor(props: SpaceDTOProps) {
    const timeRentals = props.rentalType.filter((target) => target.rentalType === 1);
    const packageRentals = props.rentalType.filter((target) => target.rentalType === 2);
    this.id = props.id;
    this.title = props.title;
    this.averageScore = props.averageScore ? Number(props.averageScore.toFixed(1)) : 0;
    this.reviewCount = props.reviewCount ?? 0;
    this.hostId = props.hostId;
    this.isInterested = props.isInterested ?? false;
    this.reportCount = props.reportCount ?? 0;
    this.isImmediateReservation = props.isImmediateReservation;
    this.isPublic = props.isPublic;
    this.isApproved = props.isApproved;
    this.isRoofOnly = props.isRoofOnly;
    this.thumbnail = props.thumbnail;
    this.interestCount = props.interestCount ?? 0;
    this.publicTransportations = props.publicTransportations.map((target) => new TransportationDTO(target));
    this.location = props.location ? new LocationDTO(props.location) : null;
    this.timeCost = timeRentals.length === 0 ? null : Math.min(...timeRentals.map((target) => target.baseCost));
    this.packageCost =
      packageRentals.length === 0 ? null : Math.min(...packageRentals.map((target) => target.baseCost));
    this.orderNo = props.orderNo ?? null;
    this.categories = props.categories.map((category) => new SpaceCategoryDTO(category));
    this.overflowUserCost = props.overflowUserCost;
    this.overflowUserCount = props.overflowUserCount;
    this.refundPolicies = props.refundPolicies.map((refundPolicy) => new RefundPolicyDTO(refundPolicy));
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static generateSpaceDTO(space: CommonSpace, userId?: string): SpaceDTOProps {
    return {
      ...space,
      reviewCount: space.reviews.length,
      location: space.location,
      averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
      isInterested: space.userInterests?.some((userInterest) => userInterest.userId === userId),
      categories: space.categories ? space.categories?.map(({ category }) => category) : [],
      reportCount: space.reports.length,
      interestCount: space.userInterests.length,
    };
  }

  static generateSpaceInclude() {
    return {
      location: true,
      reviews: {
        where: {
          deletedAt: null,
        },
      },
      publicTransportations: true,
      userInterests: true,
      rentalType: true,
      categories: {
        include: {
          category: {
            include: {
              icons: {
                include: {
                  icon: true,
                },
              },
            },
          },
        },
        orderBy: {
          orderNo: 'asc',
        },
      } as CategoryInclude,
      reports: {
        where: {
          spaceId: {
            not: null,
          },
        },
      },
      refundPolicies: true,
    };
  }
}
