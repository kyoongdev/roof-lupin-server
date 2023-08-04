export interface CreateCurationSpaceDTOProps {
    orderNo?: number;
    spaceId: string;
}
export declare class CreateCurationSpaceDTO {
    spaceId: string;
    orderNo?: number;
    constructor(props?: CreateCurationSpaceDTOProps);
}
