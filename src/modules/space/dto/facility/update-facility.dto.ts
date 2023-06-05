import { Property } from 'wemacu-nestjs';

export interface UpdateFacilityDTOProps {
  iconPath?: string;
  name?: string;
}

export class UpdateFacilityDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '시설 아이콘 경로' } })
  iconPath: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '시설 이름' } })
  name: string;

  constructor(props?: UpdateFacilityDTOProps) {
    if (props) {
      this.iconPath = props.iconPath;
      this.name = props.name;
    }
  }
}
