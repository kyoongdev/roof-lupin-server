import { PagingMetaDTO, PagingMetaDTOInterface } from 'cumuco-nestjs';
import { SpaceDTO } from '@/modules/space/dto';
export interface PagingRankingDTOProps {
    spaces: SpaceDTO[];
    paging: PagingMetaDTOInterface;
}
export declare class PagingRankingDTO {
    data: SpaceDTO[];
    paging: PagingMetaDTO;
    constructor(props: PagingRankingDTOProps);
}
