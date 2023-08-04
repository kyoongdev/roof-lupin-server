export interface UpdateHomeContentsDTOProps {
    orderNo: number;
    contentCategoryId?: string;
    exhibitionId?: string;
    rankingId?: string;
}
export declare class UpdateHomeContentsDTO {
    orderNo: number;
    contentCategoryId?: string;
    exhibitionId?: string;
    rankingId?: string;
    constructor(props?: UpdateHomeContentsDTOProps);
}
