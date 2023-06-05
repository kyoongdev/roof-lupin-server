import { Property } from 'wemacu-nestjs';
export interface CreateFacilityDTOProps {
  iconPath: string;
  name: string;
}

export class CreateFacilityDTO {
  @Property({ apiProperty: { type: 'string', description: '시설 아이콘 경로' } })
  iconPath: string;

  @Property({ apiProperty: { type: 'string', description: '시설 이름' } })
  name: string;

  constructor(props?: CreateFacilityDTOProps) {
    if (props) {
      this.iconPath = props.iconPath;
      this.name = props.name;
    }
  }
}
