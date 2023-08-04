export interface CreateLocationDTOProps {
    lat: string;
    lng: string;
    roadAddress: string;
    jibunAddress: string;
}
export declare class CreateLocationDTO {
    lat: string;
    lng: string;
    roadAddress: string;
    jibunAddress: string;
    constructor(props?: CreateLocationDTOProps);
}
