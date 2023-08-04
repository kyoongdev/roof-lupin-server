import { UpdateExhibitionSpaceDTO, UpdateExhibitionSpaceDTOProps } from './update-exhibition-space.dto';
export interface UpdateExhibitionDTOProps {
    title?: string;
    thumbnail?: string;
    description?: string;
    content?: string;
    startAt?: Date;
    endAt?: Date;
    isShow?: boolean;
    images?: string[];
    spaces?: UpdateExhibitionSpaceDTOProps[];
    couponIds?: string[];
}
export declare class UpdateExhibitionDTO {
    title?: string;
    thumbnail?: string;
    description?: string;
    content?: string;
    startAt?: Date;
    endAt?: Date;
    isShow?: boolean;
    images?: string[];
    spaces?: UpdateExhibitionSpaceDTO[];
    couponIds?: string[];
    constructor(props?: UpdateExhibitionDTOProps);
}
