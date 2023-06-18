import { Property } from 'wemacu-nestjs';
export interface CreateBuildingDTOProps {
  iconPath: string;
  name: string;
}

export class CreateBuildingDTO {
  @Property({ apiProperty: { type: 'string', description: '시설 아이콘 경로' } })
  iconPath: string;

  @Property({ apiProperty: { type: 'string', description: '시설 이름' } })
  name: string;

  constructor(props?: CreateBuildingDTOProps) {
    if (props) {
      this.iconPath = props.iconPath;
      this.name = props.name;
    }
  }
}
