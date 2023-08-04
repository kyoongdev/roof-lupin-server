import { CreateRankingSpaceDTO, CreateRankingSpaceDTOProps } from './create-ranking-space.dto';
export interface CreateRankingDTOProps {
    name: string;
    description: string;
    spaces: CreateRankingSpaceDTOProps[];
}
export declare class CreateRankingDTO {
    name: string;
    description: string;
    spaces: CreateRankingSpaceDTO[];
    constructor(props?: CreateRankingDTOProps);
}
