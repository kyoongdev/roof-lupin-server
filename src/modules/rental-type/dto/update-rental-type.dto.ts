import { BadRequestException } from '@nestjs/common';

import { Property } from 'cumuco-nestjs';

import { RentalTypeReqDecorator } from '@/modules/rental-type/dto/validation/rental-type.validation';
import { UpdateAdditionalServiceDTO, UpdateAdditionalServiceDTOProps } from '@/modules/space/dto/additional-service';
import { UpdateTimeCostInfoDTO, UpdateTimeCostInfoDTOProps } from '@/modules/space/dto/timeCostInfo';
import { DayReqDecorator } from '@/utils/validation/day.validation';

export interface UpdateRentalTypeDTOProps {
  name?: string;
  baseCost?: number;
  rentalType?: number;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  day?: number;
  timeCostInfos?: UpdateTimeCostInfoDTOProps[];
  additionalServices?: UpdateAdditionalServiceDTOProps[];
}

export class UpdateRentalTypeDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '대여타입 이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '기본 가격' } })
  baseCost?: number;

  @RentalTypeReqDecorator()
  rentalType?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } })
  baseHour?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '시작 시간' } })
  startAt?: number;

  @DayReqDecorator(true)
  day?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '종료 시간' } })
  endAt?: number;

  @Property({ apiProperty: { type: UpdateTimeCostInfoDTO, isArray: true, nullable: true, description: '시간별 가격' } })
  timeCostInfos?: UpdateTimeCostInfoDTO[];

  @Property({
    apiProperty: { type: UpdateAdditionalServiceDTO, nullable: true, isArray: true, description: '추가 서비스 목록' },
  })
  additionalServices: UpdateAdditionalServiceDTO[];

  constructor(props?: UpdateRentalTypeDTOProps) {
    if (props) {
      this.name = props.name;
      this.baseCost = props.baseCost;
      this.rentalType = props.rentalType;
      this.day = props.day;
      this.baseHour = props.baseHour;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.timeCostInfos = props.timeCostInfos?.map((timeCostInfo) => new UpdateTimeCostInfoDTO(timeCostInfo));

      this.additionalServices = props.additionalServices.map(
        (additionalService) => new UpdateAdditionalServiceDTO(additionalService)
      );
    }
  }

  validateTimeCostInfos() {
    if (this.timeCostInfos) {
      const times = this.timeCostInfos.map((timeCost) => timeCost.time);
      const isDuplicate = times.some((time, index) => times.indexOf(time) !== index);
      if (isDuplicate) {
        throw new BadRequestException('시간은 9~32까지 하나만 입력해수제요.');
      }
    }
  }
}
