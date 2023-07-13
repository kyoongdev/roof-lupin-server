import { Property } from 'wemacu-nestjs';

import { UpdateRankingSpaceDTO, UpdateRankingSpaceDTOProps } from './update-ranking-space.dto';

export interface UpdateRankingDTOProps {
  name: string;
  spaces: UpdateRankingSpaceDTOProps[];
}

export class UpdateRankingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: UpdateRankingSpaceDTO, isArray: true, nullable: true, description: '공간' } })
  spaces: UpdateRankingSpaceDTO[];

  constructor(props?: UpdateRankingDTOProps) {
    if (props) {
      this.name = props.name;
      this.spaces = props.spaces.map((space) => new UpdateRankingSpaceDTO(space));
    }
  }
}
