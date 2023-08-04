import { NaverCoordinateLocationDTO } from './dto/naver/naver-coordinate-location.dto';
import { NaverCoordinateQuery, NaverGeocodeQuery } from './dto/query';
import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    findNaverLocation(query: NaverGeocodeQuery): Promise<import("cumuco-nestjs").NaverGeocodeResponse>;
    findNaverLocationByCoordinate(query: NaverCoordinateQuery): Promise<NaverCoordinateLocationDTO>;
}
