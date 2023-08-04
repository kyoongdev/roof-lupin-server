export interface CreateBlockedTimeDTOProps {
    year: string;
    month: string;
    day: string;
    startAt: number;
    endAt: number;
    spaceId: string;
}
export declare class CreateBlockedTimeDTO {
    spaceId: string;
    year: string;
    month: string;
    day: string;
    startAt: number;
    endAt: number;
    constructor(props?: CreateBlockedTimeDTOProps);
}
