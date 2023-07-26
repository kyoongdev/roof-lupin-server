import { PagingMetaDTO, PagingMetaDTOInterface, Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

import { RankingDTO, RankingDTOProps } from './ranking.dto';

export interface PagingRankingDTOProps {
  name: string;
  description: string;
  spaces: SpaceDTO[];
  paging: PagingMetaDTOInterface;
}

export class PagingRankingDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '설명' } })
  description: string;

  @Property({ apiProperty: { type: SpaceDTO, isArray: true, description: '랭킹' } })
  data: SpaceDTO[];

  @Property({ apiProperty: { type: PagingMetaDTO, description: '페이징 메타' } })
  paging: PagingMetaDTO;

  constructor(props: PagingRankingDTOProps) {
    this.name = props.name;
    this.description = props.description;
    this.data = props.spaces;
    this.paging = new PagingMetaDTO(props.paging);
  }
}
