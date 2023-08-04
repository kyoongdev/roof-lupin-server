export interface LocationDTOProps {
    id: string;
    lat: string;
    lng: string;
    roadAddress: string;
    jibunAddress: string;
}
export declare class LocationDTO {
    id: string;
    lat: string;
    lng: string;
    roadAddress: string;
    jibunAddress: string;
    constructor(props: LocationDTOProps);
}
