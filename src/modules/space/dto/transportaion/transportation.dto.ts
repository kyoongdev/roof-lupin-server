import { Property } from 'wemacu-nestjs';

export interface TransportationDTOProps {
  id: string;
  name: string;
  timeTaken: number;
}

export class TransportationDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '역/정류장 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '걸리는 시간 (분)' } })
  timeTaken: number;

  constructor(props: TransportationDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.timeTaken = props.timeTaken;
  }
}
