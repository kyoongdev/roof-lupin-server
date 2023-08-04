import { SocialLocationService } from 'cumuco-nestjs';
import { NaverCoordinateLocationDTO } from './dto/naver/naver-coordinate-location.dto';
import { NaverCoordinateQuery, NaverGeocodeQuery } from './dto/query';
import { LocationRepository } from './location.repository';
export declare class LocationService {
    private readonly locationRepository;
    private readonly socialLocationService;
    constructor(locationRepository: LocationRepository, socialLocationService: SocialLocationService);
    findNaverLocation(query: NaverGeocodeQuery): Promise<import("cumuco-nestjs").NaverGeocodeResponse>;
    findNaverLocationByCoordinate(query: NaverCoordinateQuery): Promise<NaverCoordinateLocationDTO>;
}
