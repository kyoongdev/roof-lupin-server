import { Property } from 'wemacu-nestjs';

export interface FacilityDTOProps {
  id: string;
  iconPath: string;
  name: string;
}

export class FacilityDTO {
  @Property({ apiProperty: { type: 'string', description: '시설 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '시설 아이콘 경로' } })
  iconPath: string;

  @Property({ apiProperty: { type: 'string', description: '시설 이름' } })
  name: string;

  constructor(props: FacilityDTOProps) {
    this.id = props.id;
    this.iconPath = props.iconPath;
    this.name = props.name;
  }
}
