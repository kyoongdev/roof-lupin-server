import { Property } from 'cumuco-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface RankingDTOProps {
  id: string;
  name: string;
  description: string;
  spaces: SpaceDTOProps[];
}

export class RankingDTO {
  @Property({ apiProperty: { type: 'string', description: '랭킹 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '설명' } })
  description: string;

  @Property({ apiProperty: { type: SpaceDTO, isArray: true, description: '공간' } })
  spaces: SpaceDTO[];

  constructor(props: RankingDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.spaces = props.spaces.map((space) => new SpaceDTO(space));
  }
}
