import { Property } from 'cumuco-nestjs';

export interface CreateLocationFilterDTOProps {
  locationFilterGroupId: string;
  names: string[];
}

export class CreateLocationFilterDTO {
  @Property({ apiProperty: { type: 'string', description: '그룹 id' } })
  locationFilterGroupId: string;

  @Property({ apiProperty: { type: 'string', isArray: true, description: '필터 이름들' } })
  names: string[];

  constructor(props?: CreateLocationFilterDTOProps) {
    if (props) {
      this.locationFilterGroupId = props.locationFilterGroupId;
      this.names = props.names;
    }
  }
}
