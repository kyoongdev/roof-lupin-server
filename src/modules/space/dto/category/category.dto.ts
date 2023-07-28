import { Property } from 'cumuco-nestjs';

export interface SpaceCategoryDTOProps {
  id: string;
  name: string;
  iconPath: string;
}

export class SpaceCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 아이콘 경로' } })
  iconPath: string;

  constructor(props: SpaceCategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.iconPath = props.iconPath;
  }
}
