export interface UpdateCategoryDTOProps {
    name?: string;
    iconPath?: string;
    isHome?: boolean;
    isRecommended?: boolean;
}
export declare class UpdateCategoryDTO {
    name: string;
    iconPath?: string;
    isHome?: boolean;
    isRecommended?: boolean;
    constructor(props?: UpdateCategoryDTOProps);
}
