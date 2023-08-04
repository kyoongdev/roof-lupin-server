export interface NaverCoordinateLocationDTOProps {
    latitude: string;
    longitude: string;
    address: string | null;
}
export declare class NaverCoordinateLocationDTO {
    latitude: string;
    longitude: string;
    address: string | null;
    constructor(props: NaverCoordinateLocationDTOProps);
}
