export interface UpdateOpenHourDTOProps {
    startAt: string;
    endAt: string;
    day: number;
}
export declare class UpdateOpenHourDTO {
    startAt: string;
    endAt: string;
    day: number;
    constructor(props?: UpdateOpenHourDTOProps);
}
