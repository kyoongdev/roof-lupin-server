import { Property } from 'wemacu-nestjs';

export interface TransportationDTOProps {
  name: string;
  timeTaken: number;
}

export class TransportationDTO {
  @Property({ apiProperty: { type: 'string', description: '교통수단 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '걸리는 시간 (분)' } })
  timeTaken: number;

  constructor(props: TransportationDTOProps) {
    this.name = props.name;
    this.timeTaken = props.timeTaken;
  }
}
