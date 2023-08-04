export interface HomeDTOProps {
    mainImageId: string;
    mainImage: string;
    sloganId: string;
    content: string;
}
export declare class MainDTO {
    mainImageId: string;
    mainImage: string;
    sloganId: string;
    content: string;
    constructor(props: HomeDTOProps);
}
