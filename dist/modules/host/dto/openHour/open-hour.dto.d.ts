export interface OpenHourDTOProps {
    id: string;
    startAt: string;
    endAt: string;
    day: number;
}
export declare class OpenHourDTO {
    id: string;
    startAt: string;
    endAt: string;
    day: number;
    constructor(props: OpenHourDTOProps);
}
