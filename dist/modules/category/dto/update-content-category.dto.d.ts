import { UpdateContentCategorySpaceDTO, UpdateContentCategorySpaceDTOProps } from './update-content-category-space.dto';
export interface UpdateContentCategoryDTOProps {
    name?: string;
    highlight?: string;
    spaces?: UpdateContentCategorySpaceDTOProps[];
}
export declare class UpdateContentCategoryDTO {
    name?: string;
    highlight?: string;
    spaces?: UpdateContentCategorySpaceDTO[];
    constructor(props?: UpdateContentCategoryDTOProps);
}
