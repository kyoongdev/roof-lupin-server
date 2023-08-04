import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
export interface ContentCategoryDTOProps {
    id: string;
    name: string;
    highlight?: string;
    spaces: SpaceDTOProps[];
}
export declare class ContentCategoryDTO {
    id: string;
    name: string;
    highlight?: string;
    spaces: SpaceDTO[];
    constructor(props: ContentCategoryDTOProps);
}
