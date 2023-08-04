export interface UpdateLocationDTOProps {
    lat?: string;
    lng?: string;
    roadAddress?: string;
    jibunAddress?: string;
}
export declare class UpdateLocationDTO {
    lat?: string;
    lng?: string;
    roadAddress?: string;
    jibunAddress?: string;
    constructor(props?: UpdateLocationDTOProps);
}
