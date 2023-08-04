import { CreateContentCategorySpaceDTO, CreateContentCategorySpaceDTOProps } from './create-content-category-space.dto';
export interface CreateContentCategoryDTOProps {
    name: string;
    highlight?: string;
    spaces: CreateContentCategorySpaceDTOProps[];
}
export declare class CreateContentCategoryDTO {
    name: string;
    highlight?: string;
    spaces: CreateContentCategorySpaceDTO[];
    constructor(props?: CreateContentCategoryDTOProps);
}
