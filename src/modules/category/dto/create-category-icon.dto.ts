import { Property } from 'cumuco-nestjs';

export interface CreateCategoryIconDTOProps {
  iconId: string;
  isMapIcon: boolean;
}

export class CreateCategoryIconDTO {
  @Property({ apiProperty: { type: 'string', description: '아이콘 id' } })
  iconId: string;

  @Property({ apiProperty: { type: 'boolean', description: '맵 아이콘 여부' } })
  isMapIcon: boolean;

  constructor(props?: CreateCategoryIconDTOProps) {
    if (props) {
      this.iconId = props.iconId;
      this.isMapIcon = props.isMapIcon;
    }
  }
}
