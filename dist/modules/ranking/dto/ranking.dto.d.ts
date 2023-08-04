import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
export interface RankingDTOProps {
    id: string;
    name: string;
    description: string;
    spaces: SpaceDTOProps[];
}
export declare class RankingDTO {
    id: string;
    name: string;
    description: string;
    spaces: SpaceDTO[];
    constructor(props: RankingDTOProps);
}
