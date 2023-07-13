import { Property } from 'wemacu-nestjs';

import { CreateRankingSpaceDTO, CreateRankingSpaceDTOProps } from './create-ranking-space.dto';

export interface CreateRankingDTOProps {
  name: string;
  spaces: CreateRankingSpaceDTOProps[];
}

export class CreateRankingDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: CreateRankingSpaceDTO, isArray: true, description: '공간' } })
  spaces: CreateRankingSpaceDTO[];

  constructor(props?: CreateRankingDTOProps) {
    if (props) {
      this.name = props.name;
      this.spaces = props.spaces.map((space) => new CreateRankingSpaceDTO(space));
    }
  }
}
