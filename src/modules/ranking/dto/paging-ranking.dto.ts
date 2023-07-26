import { PagingMetaDTO, PagingMetaDTOInterface, Property } from 'wemacu-nestjs';

import { SpaceDTO } from '@/modules/space/dto';

export interface PagingRankingDTOProps {
  spaces: SpaceDTO[];
  paging: PagingMetaDTOInterface;
}

export class PagingRankingDTO {
  @Property({ apiProperty: { type: SpaceDTO, isArray: true, description: '랭킹' } })
  data: SpaceDTO[];

  @Property({ apiProperty: { type: PagingMetaDTO, description: '페이징 메타' } })
  paging: PagingMetaDTO;

  constructor(props: PagingRankingDTOProps) {
    this.data = props.spaces;
    this.paging = new PagingMetaDTO(props.paging);
  }
}
