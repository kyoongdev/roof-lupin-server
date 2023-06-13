import { Property } from 'wemacu-nestjs';

import { UpdateTimeCostInfoDTO, UpdateTimeCostInfoDTOProps } from '../timeCostInfo';
import { RENTAL_TYPE_KEYS, RentalTypeReqDecorator } from '../validation/rental-type.validation';

import { RentalTypeValidation } from './validation/rental-type.validation';

export interface UpdateRentalTypeDTOProps {
  name?: string;
  baseCost?: number;
  rentalType?: number;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  timeCostInfos?: UpdateTimeCostInfoDTOProps[];
}

export class UpdateRentalTypeDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '대여타입 이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '기본 가격' } })
  baseCost?: number;

  @RentalTypeReqDecorator()
  @Property({
    apiProperty: { type: 'string', nullable: true, enum: RENTAL_TYPE_KEYS, description: RENTAL_TYPE_KEYS.join(',') },
  })
  rentalType?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } })
  baseHour?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '시작 시간' } })
  startAt?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '종료 시간' } })
  endAt?: number;

  @Property({ apiProperty: { type: UpdateTimeCostInfoDTO, isArray: true, nullable: true, description: '시간별 가격' } })
  timeCostInfos?: UpdateTimeCostInfoDTO[];

  constructor(props?: UpdateRentalTypeDTOProps) {
    if (props) {
      this.name = props.name;
      this.baseCost = props.baseCost;
      this.rentalType = props.rentalType;
      this.baseHour = props.baseHour;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.timeCostInfos = props.timeCostInfos
        ?.map((timeCostInfo) => new UpdateTimeCostInfoDTO(timeCostInfo))
        .sort((a, b) => a.time - b.time);
    }
  }
}
