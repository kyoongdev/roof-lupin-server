import { type NaverAddress } from 'cumuco-nestjs';
import { NaverAddressElementDTO } from './address-element.dto';
export type NaverAddressDTOProps = NaverAddress;
export declare class NaverAddresssDTO {
    roadAddress: string;
    jibunAddress: string;
    englishAddress: string;
    longitude: string;
    latitude: string;
    distance: number;
    addressElements: NaverAddressElementDTO[];
    constructor(props: NaverAddressDTOProps);
}
