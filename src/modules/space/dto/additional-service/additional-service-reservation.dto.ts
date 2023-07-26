import { Property } from 'cumuco-nestjs';

export interface AdditionalServiceReservationDTOProps {
  id: string;
  count: number;
}

export class AdditionalServiceReservationDTO {
  @Property({ apiProperty: { type: 'string', description: '추가 서비스 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '추가 서비스 개수' } })
  count: number;

  constructor(props?: AdditionalServiceReservationDTOProps) {
    if (props) {
      this.id = props.id;
      this.count = props.count;
    }
  }
}
