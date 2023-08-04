export interface CreateOpenHourDTOProps {
    startAt: string;
    endAt: string;
    day: number;
}
export declare class CreateOpenHourDTO {
    startAt: string;
    endAt: string;
    day: number;
    constructor(props?: CreateOpenHourDTOProps);
}
