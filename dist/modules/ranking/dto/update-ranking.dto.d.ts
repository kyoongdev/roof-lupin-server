import { UpdateRankingSpaceDTO, UpdateRankingSpaceDTOProps } from './update-ranking-space.dto';
export interface UpdateRankingDTOProps {
    name?: string;
    description?: string;
    spaces?: UpdateRankingSpaceDTOProps[];
}
export declare class UpdateRankingDTO {
    name: string;
    description: string;
    spaces: UpdateRankingSpaceDTO[];
    constructor(props?: UpdateRankingDTOProps);
}
