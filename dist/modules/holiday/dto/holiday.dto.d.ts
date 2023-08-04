export interface HolidayDTOProps {
    id: string;
    name: string;
    year: string;
    month: string;
    day: string;
}
export declare class HolidayDTO {
    id: string;
    name: string;
    year: string;
    month: string;
    day: string;
    constructor(props: HolidayDTOProps);
}
