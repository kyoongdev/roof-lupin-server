import { Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface ContentCategoryDTOProps {
  id: string;
  name: string;
  highlight?: string;
  spaces: SpaceDTOProps[];
}

export class ContentCategoryDTO {
  @Property({ apiProperty: { type: 'string', description: '카테고리 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '카테고리 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 하이라이트 텍스트' } })
  highlight?: string;

  @Property({ apiProperty: { type: SpaceDTO, isArray: true, description: '카테고리 공간' } })
  spaces: SpaceDTO[];

  constructor(props: ContentCategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.highlight = props.highlight;
    this.spaces = props.spaces.map((space) => new SpaceDTO(space));
  }
}
