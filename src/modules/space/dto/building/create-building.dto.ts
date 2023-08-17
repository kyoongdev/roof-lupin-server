import { Property } from 'cumuco-nestjs';
export interface CreateBuildingDTOProps {
  iconId: string;
  name: string;
}

export class CreateBuildingDTO {
  @Property({ apiProperty: { type: 'string', description: '아이콘 id' } })
  iconId: string;

  @Property({ apiProperty: { type: 'string', description: '시설 이름' } })
  name: string;

  constructor(props?: CreateBuildingDTOProps) {
    if (props) {
      this.iconId = props.iconId;
      this.name = props.name;
    }
  }
}
