export interface CreateCategoryDTOProps {
    name: string;
    iconPath?: string;
    isHome?: boolean;
    isRecommended?: boolean;
}
export declare class CreateCategoryDTO {
    name: string;
    iconPath?: string;
    isHome?: boolean;
    isRecommended?: boolean;
    constructor(props?: CreateCategoryDTOProps);
}
