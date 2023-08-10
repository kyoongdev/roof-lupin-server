import { Property } from 'cumuco-nestjs';

export interface UpdateLocationFilterDTOProps {
  names: string[];
}

export class UpdateLocationFilterDTO {
  @Property({ apiProperty: { type: 'string', isArray: true, description: '필터 이름들' } })
  names: string[];

  constructor(props?: UpdateLocationFilterDTOProps) {
    if (props) {
      this.names = props.names;
    }
  }
}
