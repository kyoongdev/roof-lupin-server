import { BadRequestException } from '@nestjs/common';

import { Property } from 'cumuco-nestjs';
import { range } from 'lodash';

import { UpdateOpenHourDTO } from '@/modules/host/dto/openHour';
import { CreateLocationDTO } from '@/modules/location/dto';
import { CreateRentalTypeDTO } from '@/modules/rental-type/dto';

import { REFUND_POLICY_DAYS_BEFORE_TYPE, REFUND_POLICY_LENGTH, SPACE_ERROR_CODE } from '../exception/errorCode';
import { SpaceException } from '../exception/space.exception';

import { CreateCautionDTO } from './caution';
import { CreateSpaceDTOProps } from './create-space.dto';
import { CreateBuildingDTO } from './facility';
import { UpdateHashTagDTO } from './hashTag';
import { UpdateSpaceHolidayDTO, UpdateSpaceHolidayDTOProps } from './holiday';
import { CreateRefundPolicyDTO } from './refund';
import { CreateSizeDTO } from './size';
import { CreateTransportationDTO } from './transportaion';

export type UpdateSpaceDTOProps = Partial<Omit<CreateSpaceDTOProps, 'holiday'>> & {
  isPublic?: boolean;
  isApproved?: boolean;
  holidays?: UpdateSpaceHolidayDTOProps[];
};

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

  @Property({ apiProperty: { type: 'number', nullable: true, description: '보증금' } })
  deposit?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '최소 인원' } })
  minUser?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '최대 인원' } })
  maxUser?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '초과 인원 당 추가 금액' } })
  overflowUserCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '초과 인원' } })
  overflowUserCount?: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '노출 여부' } })
  isPublic?: boolean;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '승인 여부' } })
  isApproved?: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '생성된 이미지 url' } })
  images?: string[];

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '즉시 예약 가능 여부' } })
  isImmediateReservation?: boolean;

  @Property({ apiProperty: { type: CreateRefundPolicyDTO, nullable: true, isArray: true, description: '환불 정책' } })
  refundPolicies?: CreateRefundPolicyDTO[];

  @Property({ apiProperty: { type: CreateCautionDTO, nullable: true, isArray: true, description: '주의 사항' } })
  cautions?: CreateCautionDTO[];

  @Property({ apiProperty: { type: CreateRentalTypeDTO, nullable: true, isArray: true, description: '대여 유형' } })
  rentalTypes?: CreateRentalTypeDTO[];

  @Property({ apiProperty: { type: CreateLocationDTO, nullable: true, description: '위치' } })
  location?: CreateLocationDTO;

  @Property({ apiProperty: { type: CreateBuildingDTO, nullable: true, isArray: true, description: '시설' } })
  buildings?: CreateBuildingDTO[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '서비스' } })
  services?: string[];

  @Property({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '카테고리' } })
  categories?: string[];

  @Property({ apiProperty: { type: UpdateHashTagDTO, nullable: true, isArray: true, description: '해시태그' } })
  hashTags?: UpdateHashTagDTO[];

  @Property({ apiProperty: { type: CreateTransportationDTO, nullable: true, isArray: true, description: '대중교통' } })
  publicTransportations?: CreateTransportationDTO[];

  @Property({ apiProperty: { type: CreateSizeDTO, nullable: true, isArray: true, description: '면적' } })
  sizes?: CreateSizeDTO[];

  @Property({ apiProperty: { type: UpdateOpenHourDTO, isArray: true, description: '영업시간' } })
  openHours?: UpdateOpenHourDTO[];

  @Property({ apiProperty: { type: UpdateSpaceHolidayDTO, isArray: true, nullable: true, description: '휴무일' } })
  holidays?: UpdateSpaceHolidayDTO[];

  constructor(props?: UpdateSpaceDTOProps) {
    if (props) {
      this.title = props.title;
      this.description = props.description;
      this.spaceType = props.spaceType;
      this.buildingType = props.buildingType;
      this.thumbnail = props.thumbnail;
      this.minUser = props.minUser;
      this.maxUser = props.maxUser;
      this.deposit = props.deposit;
      this.overflowUserCost = props.overflowUserCost;
      this.overflowUserCount = props.overflowUserCount;
      this.images = props.images;
      this.refundPolicies = props.refundPolicies;
      this.cautions = props.cautions;
      this.isImmediateReservation = props.isImmediateReservation;
      this.isApproved = props.isApproved;
      this.isPublic = props.isPublic;
      this.rentalTypes = props.rentalTypes.map((rentalType) => new CreateRentalTypeDTO(rentalType));
      this.location = new CreateLocationDTO(props.location);
      this.buildings = props.buildings.map((facility) => new CreateBuildingDTO(facility));
      this.services = props.services;
      this.categories = props.categories;
      this.hashTags = props.hashTags.map((hashtag) => new UpdateHashTagDTO(hashtag));
      this.publicTransportations = props.publicTransportations.map(
        (transportation) => new CreateTransportationDTO(transportation)
      );
      this.sizes = props.sizes.map((size) => new CreateSizeDTO(size));
      this.openHours = props.openHours.map((openHour) => new UpdateOpenHourDTO(openHour));
      this.holidays = props.holidays.map((holiday) => new UpdateSpaceHolidayDTO(holiday));
    }
  }

  validateDTO() {
    this.validateOpenHours();
    this.validateRefundPolicies();
  }

  validateRefundPolicies() {
    if (!this.refundPolicies) return;
    if (this.refundPolicies.length !== 9) {
      throw new SpaceException(SPACE_ERROR_CODE.BAD_REQUEST(REFUND_POLICY_LENGTH));
    }
    range(0, 9).forEach((idx) => {
      const isExist = this.refundPolicies.find((refundPolicy) => refundPolicy.daysBefore === idx);
      if (!isExist) {
        throw new SpaceException(SPACE_ERROR_CODE.BAD_REQUEST(REFUND_POLICY_DAYS_BEFORE_TYPE));
      }
    });
  }

  validateOpenHours() {
    if (!this.openHours) return;
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

  setIsApproved(isApproved: boolean) {
    this.isApproved = isApproved;
  }
}
