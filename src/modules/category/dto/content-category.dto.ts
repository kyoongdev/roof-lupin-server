import { Property } from 'cumuco-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface ContentCategoryDTOProps {
  id: string;
  name: string;
  highlight?: string;
  spaces: SpaceDTOProps[];
  deletedAt?: Date;
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

  @Property({ apiProperty: { type: 'date', nullable: true, description: '카테고리 삭제일' } })
  deletedAt?: Date;

  constructor(props: ContentCategoryDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.highlight = props.highlight;
    this.spaces = props.spaces.map((space) => new SpaceDTO(space));
    this.deletedAt = props.deletedAt;
  }
}
