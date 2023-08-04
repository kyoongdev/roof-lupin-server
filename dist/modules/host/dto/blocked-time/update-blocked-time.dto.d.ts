export interface UpdateBlockedTimeDTOProps {
    year: string;
    month: string;
    day: string;
    startAt: number;
    endAt: number;
}
export declare class UpdateBlockedTimeDTO {
    year: string;
    month: string;
    day: string;
    startAt: number;
    endAt: number;
    constructor(props?: UpdateBlockedTimeDTOProps);
}
