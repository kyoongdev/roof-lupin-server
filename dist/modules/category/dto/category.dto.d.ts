export interface CategoryDTOProps {
    id: string;
    name: string;
    isHome: boolean;
    iconPath?: string;
    isRecommended: boolean;
}
export declare class CategoryDTO {
    id: string;
    name: string;
    iconPath?: string;
    isHome: boolean;
    isRecommended: boolean;
    constructor(props: CategoryDTOProps);
}
