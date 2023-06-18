import { Property } from 'wemacu-nestjs';

export interface UpdateBuildingDTOProps {
  iconPath?: string;
  name?: string;
}

export class UpdateBuildingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '시설 아이콘 경로' } })
  iconPath: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '시설 이름' } })
  name: string;

  constructor(props?: UpdateBuildingDTOProps) {
    if (props) {
      this.iconPath = props.iconPath;
      this.name = props.name;
    }
  }
}
