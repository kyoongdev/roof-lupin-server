import { NaverGeocodeResponse } from 'cumuco-nestjs';
import { NaverAddresssDTO } from './address.dto';
import { NaverMetaDTO } from './meta.dto';
export declare class NaverLocationDTO {
    status: string;
    meta: NaverMetaDTO;
    addresses: NaverAddresssDTO[];
    constructor(props: NaverGeocodeResponse);
}
