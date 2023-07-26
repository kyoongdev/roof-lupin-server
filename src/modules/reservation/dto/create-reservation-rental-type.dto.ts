import { Property } from 'cumuco-nestjs';

import {
  AdditionalServiceReservationDTO,
  AdditionalServiceReservationDTOProps,
} from '@/modules/space/dto/additional-service';

import { TimeValidation } from './validation';

export interface CreateReservationRentalTypeDTOProps {
  rentalTypeId: string;
  startAt: number;
  endAt: number;
  additionalServices?: AdditionalServiceReservationDTOProps[];
}

export class CreateReservationRentalTypeDTO {
  @Property({ apiProperty: { type: 'string', description: '대여 id' } })
  rentalTypeId: string;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '대여 시작 시간' } })
  startAt: number;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '대여 종료 시간' } })
  endAt: number;

  @Property({
    apiProperty: { type: AdditionalServiceReservationDTO, isArray: true, nullable: true, description: '추가 서비스들' },
  })
  additionalServices?: AdditionalServiceReservationDTO[];

  constructor(props?: CreateReservationRentalTypeDTOProps) {
    if (props) {
      this.rentalTypeId = props.rentalTypeId;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.additionalServices = props.additionalServices?.map(
        (service) => new AdditionalServiceReservationDTO(service)
      );
    }
  }
}
