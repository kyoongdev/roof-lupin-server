import { Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

export interface RankingDTOProps {
  name: string;
  spaces: SpaceDTOProps[];
}

export class RankingDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: SpaceDTO, isArray: true, description: '공간' } })
  spaces: SpaceDTO[];

  constructor(props: RankingDTOProps) {
    this.name = props.name;
    this.spaces = props.spaces.map((space) => new SpaceDTO(space));
  }
}
