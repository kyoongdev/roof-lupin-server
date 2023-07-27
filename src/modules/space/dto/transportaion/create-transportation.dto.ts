import { Property } from 'cumuco-nestjs';

export interface CreateTransportationDTOProps {
  name: string;
  timeTaken: number;
}

export class CreateTransportationDTO {
  @Property({ apiProperty: { type: 'string', description: '역/버스정류장 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '걸리는 시간 (분)' } })
  timeTaken: number;

  constructor(props?: CreateTransportationDTOProps) {
    if (props) {
      this.name = props.name;
      this.timeTaken = props.timeTaken;
    }
  }
}
