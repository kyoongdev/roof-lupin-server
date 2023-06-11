import { Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface HomeContentsDTOProps {
  id: string;
  name: string;
  highlight?: string;
  spaces: SpaceDTOProps[];
}

export class HomeContentsDTO {
  @Property({ apiProperty: { type: 'string', description: '홈 컨텐츠 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '홈 컨텐츠 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '홈 컨텐츠 하이라이트' } })
  highlight: string | null;

  @Property({ apiProperty: { type: SpaceDTO, isArray: true, description: '홈 컨텐츠 공간' } })
  spaces: SpaceDTO[];

  constructor(props: HomeContentsDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.highlight = props.highlight ?? null;
    this.spaces = props.spaces.map((space) => new SpaceDTO(space));
  }
}
