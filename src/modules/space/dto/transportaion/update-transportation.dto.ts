import { Property } from 'cumuco-nestjs';

export interface UpdateTransportationDTOProps {
  name: string;
  timeTaken: number;
}

export class UpdateTransportationDTO {
  @Property({ apiProperty: { type: 'string', description: '역/버스정류장 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '걸리는 시간 (분)' } })
  timeTaken: number;

  constructor(props?: UpdateTransportationDTOProps) {
    if (props) {
      this.name = props.name;
      this.timeTaken = props.timeTaken;
    }
  }
}
