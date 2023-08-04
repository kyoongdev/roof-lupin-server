import { CreateExhibitionSpaceDTO, CreateExhibitionSpaceDTOProps } from './create-exhibition-space.dto';
export interface CreateExhibitionDTOProps {
    title: string;
    thumbnail: string;
    description: string;
    content: string;
    startAt: Date;
    endAt: Date;
    isShow?: boolean;
    images: string[];
    spaces: CreateExhibitionSpaceDTOProps[];
    couponIds: string[];
}
export declare class CreateExhibitionDTO {
    title: string;
    thumbnail: string;
    description: string;
    content: string;
    startAt: Date;
    endAt: Date;
    isShow?: boolean;
    images: string[];
    spaces: CreateExhibitionSpaceDTO[];
    couponIds: string[];
    constructor(props?: CreateExhibitionDTOProps);
}
