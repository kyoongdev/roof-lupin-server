export interface BlockedTimeDTOProps {
    id: string;
    year: string;
    month: string;
    day: string;
    startAt: number;
    endAt: number;
    spaceId: string;
}
export declare class BlockedTimeDTO {
    id: string;
    year: string;
    month: string;
    day: string;
    startAt: number;
    endAt: number;
    spaceId: string;
    constructor(props: BlockedTimeDTOProps);
}
