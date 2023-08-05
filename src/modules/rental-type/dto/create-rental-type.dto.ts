import { Property } from 'cumuco-nestjs';

import { CreateAdditionalServiceDTO, CreateAdditionalServiceDTOProps } from '@/modules/space/dto/additional-service';
import { CreateTimeCostInfoDTO, CreateTimeCostInfoDTOProps } from '@/modules/space/dto/timeCostInfo';
import { DayReqDecorator } from '@/utils/validation/day.validation';

import { RentalTypeReqDecorator } from './validation/rental-type.validation';

export interface CreateRentalTypeDTOProps {
  name: string;
  baseCost: number;
  rentalType: number;
  baseHour?: number;
  startAt?: number;
  endAt?: number;
  day: number;
  timeCostInfos?: CreateTimeCostInfoDTOProps[];
  additionalServices: CreateAdditionalServiceDTOProps[];
}

export class CreateRentalTypeDTO {
  @Property({ apiProperty: { type: 'string', description: '대여타입 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '기본 가격 (시간 상품은 최소값)' } })
  baseCost: number;

  @RentalTypeReqDecorator(false)
  rentalType: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '기본 시간' } })
  baseHour?: number;

  @DayReqDecorator()
  day: number;

  @Property({ apiProperty: { type: 'number', description: '시작 시간' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number', description: '종료 시간' } })
  endAt: number;

  @Property({ apiProperty: { type: CreateTimeCostInfoDTO, isArray: true, nullable: true, description: '시간별 가격' } })
  timeCostInfos?: CreateTimeCostInfoDTO[];

  @Property({ apiProperty: { type: CreateAdditionalServiceDTO, isArray: true, description: '추가 서비스 목록' } })
  additionalServices: CreateAdditionalServiceDTO[];

  constructor(props?: CreateRentalTypeDTOProps) {
    if (props) {
      this.name = props.name;
      this.baseCost = props.baseCost;
      this.rentalType = props.rentalType;
      this.baseHour = props.baseHour;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.day = props.day;
      this.timeCostInfos = props.timeCostInfos
        ?.map((timeCostInfo) => new CreateTimeCostInfoDTO(timeCostInfo))
        .sort((a, b) => a.time - b.time);

      this.additionalServices = props.additionalServices.map(
        (additionalService) => new CreateAdditionalServiceDTO(additionalService)
      );
    }
  }
}
