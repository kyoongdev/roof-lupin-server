import { BadRequestException } from '@nestjs/common';

import { Property } from 'cumuco-nestjs';
import { range } from 'lodash';

import { CreateOpenHourDTO, type CreateOpenHourDTOProps } from '@/modules/host/dto/openHour';
import { CreateLocationDTO, type CreateLocationDTOProps } from '@/modules/location/dto';
import { CreateRentalTypeDTO, type CreateRentalTypeDTOProps } from '@/modules/rental-type/dto';
import { PeriodsValidation } from '@/utils';

import { SPACE_ERROR_CODE } from '../exception/errorCode';
import { SpaceException } from '../exception/space.exception';

import { CreateBuildingDTO, type CreateBuildingDTOProps } from './building';
import { CreateSpaceCategoryDTO, CreateSpaceCategoryDTOProps } from './category';
import { CreateHashTagDTO, type CreateHashTagDTOProps } from './hashTag';
import { CreateSpaceHolidayDTO, CreateSpaceHolidayDTOProps } from './holiday';
import { CreateRefundPolicyDTO, type CreateRefundPolicyDTOProps } from './refund';
import { CreateSizeDTO, type CreateSizeDTOProps } from './size';
import { CreateTransportationDTO, type CreateTransportationDTOProps } from './transportaion';

export interface CreateSpaceDTOProps {
  title: string;
  description: string;
  spaceType?: number;
  buildingType?: number;
  thumbnail: string;
  phoneNumber: string;
  minUser: number;
  maxUser: number;
  overflowUserCost: number;
  overflowUserCount: number;
  isImmediateReservation?: boolean;
  isRoofOnly?: boolean;
  deposit?: number;
  link?: string;
  images: string[];
  refundPolicies: CreateRefundPolicyDTOProps[];
  caution: string;
  rentalTypes: CreateRentalTypeDTOProps[];
  location: CreateLocationDTOProps;
  buildings: CreateBuildingDTOProps[];
  services: string[];
  categories: CreateSpaceCategoryDTOProps[];
  hashTags: CreateHashTagDTOProps[];
  publicTransportations: CreateTransportationDTOProps[];
  sizes: CreateSizeDTOProps[];
  openHours: CreateOpenHourDTOProps[];
  holidays?: CreateSpaceHolidayDTOProps[];
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

  @Property({ apiProperty: { type: 'string', maxLength: 11, minLength: 11, description: '전화번호' } })
  phoneNumber: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '보증금' } })
  deposit?: number;

  @Property({ apiProperty: { type: 'number', description: '최소 인원' } })
  minUser: number;

  @Property({ apiProperty: { type: 'number', description: '최대 인원' } })
  maxUser: number;

  @Property({ apiProperty: { type: 'number', description: '초과 인원 당 추가 금액' } })
  overflowUserCost: number;

  @Property({ apiProperty: { type: 'number', description: '초과 인원' } })
  overflowUserCount: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '즉시 예약 가능 여부' } })
  isImmediateReservation?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '옥상 유일 여부' } })
  isRoofOnly?: boolean;

  @Property({ apiProperty: { type: 'string', isArray: true, description: '생성된 이미지 url' } })
  images: string[];

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 링크' } })
  link?: string;

  @Property({ apiProperty: { type: CreateRefundPolicyDTO, isArray: true, description: '환불 정책' } })
  refundPolicies: CreateRefundPolicyDTO[];

  @Property({ apiProperty: { type: 'string', description: '주의 사항' } })
  caution: string;

  @PeriodsValidation()
  @Property({ apiProperty: { type: CreateRentalTypeDTO, isArray: true, description: '대여 유형' } })
  rentalTypes: CreateRentalTypeDTO[];

  @Property({ apiProperty: { type: CreateLocationDTO, description: '위치' } })
  location: CreateLocationDTO;

  @Property({ apiProperty: { type: CreateBuildingDTO, isArray: true, description: '시설' } })
  buildings: CreateBuildingDTO[];

  @Property({ apiProperty: { type: 'string', isArray: true, description: '서비스 id 들' } })
  services: string[];

  @Property({ apiProperty: { type: CreateSpaceCategoryDTO, isArray: true, description: '카테고리 ids' } })
  categories: CreateSpaceCategoryDTO[];

  @Property({ apiProperty: { type: CreateHashTagDTO, isArray: true, description: '해시태그' } })
  hashTags: CreateHashTagDTO[];

  @Property({ apiProperty: { type: CreateTransportationDTO, isArray: true, description: '대중교통' } })
  publicTransportations: CreateTransportationDTO[];

  @Property({ apiProperty: { type: CreateSizeDTO, isArray: true, description: '면적' } })
  sizes: CreateSizeDTO[];

  @PeriodsValidation()
  @Property({ apiProperty: { type: CreateOpenHourDTO, isArray: true, description: '영업시간' } })
  openHours: CreateOpenHourDTO[];

  @Property({ apiProperty: { type: CreateSpaceHolidayDTO, isArray: true, nullable: true, description: '휴일' } })
  holidays?: CreateSpaceHolidayDTO[];

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
      this.deposit = props.deposit;
      this.refundPolicies = props.refundPolicies;
      this.caution = props.caution;
      this.phoneNumber = props.phoneNumber;
      this.link = props.link;
      this.isImmediateReservation = props.isImmediateReservation;
      this.isRoofOnly = props.isRoofOnly;
      this.rentalTypes = props.rentalTypes.map((rentalType) => new CreateRentalTypeDTO(rentalType));
      this.location = new CreateLocationDTO(props.location);
      this.buildings = props.buildings.map((facility) => new CreateBuildingDTO(facility));
      this.services = props.services;
      this.categories = props.categories;
      this.hashTags = props.hashTags.map((hashTag) => new CreateHashTagDTO(hashTag));
      this.publicTransportations = props.publicTransportations.map(
        (transportation) => new CreateTransportationDTO(transportation)
      );
      this.sizes = props.sizes.map((size) => new CreateSizeDTO(size));
      this.openHours = props.openHours.map((openHour) => new CreateOpenHourDTO(openHour));
      this.holidays = props.holidays?.map((holiday) => new CreateSpaceHolidayDTO(holiday));
    }
  }

  validateDTO() {
    this.validateOpenHours();
    this.validateRefundPolicies();
  }

  validateRefundPolicies() {
    if (this.refundPolicies.length !== 9) {
      throw new SpaceException(SPACE_ERROR_CODE.REFUND_POLICY_LENGTH);
    }
    range(0, 9).forEach((idx) => {
      const isExist = this.refundPolicies.find((refundPolicy) => refundPolicy.daysBefore === idx);
      if (!isExist) {
        throw new SpaceException(SPACE_ERROR_CODE.REFUND_POLICY_DAYS_BEFORE_TYPE);
      }
    });
  }

  validateOpenHours() {
    const days = this.openHours.map((openHour) => {
      if (openHour.startAt >= openHour.endAt) {
        throw new BadRequestException('영업시간 시작시간은 종료시간보다 빠를 수 없습니다.');
      }
      return openHour.day;
    });
    const isDuplicate = days.some((day, index) => days.indexOf(day) !== index);
    if (isDuplicate) {
      throw new BadRequestException('영업시간 요일은 중복될 수 없습니다.');
    }
  }
}
