import { Property } from 'cumuco-nestjs';

import { AdditionalServiceDTO, AdditionalServiceDTOProps } from '@/modules/space/dto/additional-service';

export interface ReservationAdditionalServiceDTOProps extends AdditionalServiceDTOProps {
  count: number;
}

export class ReservationAdditionalServiceDTO extends AdditionalServiceDTO {
  @Property({ apiProperty: { type: 'number', description: '추가 서비스 개수' } })
  count: number;

  constructor(props: ReservationAdditionalServiceDTOProps) {
    super(props);
    this.count = props.count;
  }
}
