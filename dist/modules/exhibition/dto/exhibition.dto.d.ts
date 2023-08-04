export interface ExhibitionDTOProps {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    content: string;
    startAt: Date;
    endAt: Date;
    createdAt: Date;
}
export declare class ExhibitionDTO {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    content: string;
    startAt: Date;
    endAt: Date;
    createdAt: Date;
    constructor(props: ExhibitionDTOProps);
}
