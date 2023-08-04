"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const naver_coordinate_location_dto_1 = require("./dto/naver/naver-coordinate-location.dto");
const location_repository_1 = require("./location.repository");
let LocationService = class LocationService {
    constructor(locationRepository, socialLocationService) {
        this.locationRepository = locationRepository;
        this.socialLocationService = socialLocationService;
    }
    async findNaverLocation(query) {
        const { latitude, longitude, ...rest } = query;
        return await this.socialLocationService.getNaverLocation({
            ...rest,
            coordinate: latitude && longitude
                ? {
                    latitude,
                    longitude,
                }
                : undefined,
        });
    }
    async findNaverLocationByCoordinate(query) {
        const data = await this.socialLocationService.getNaverReverseLocation({
            coordinate: {
                latitude: query.latitude,
                longitude: query.longitude,
            },
            output: 'json',
            orders: 'admcode',
        });
        if (!data || data.length === 0)
            return new naver_coordinate_location_dto_1.NaverCoordinateLocationDTO({
                ...query,
                address: null,
            });
        const { region } = data[0];
        const address = Object.entries(region)
            .reduce((acc, [key, value]) => {
            if (key !== 'area0' && value.name.length !== 0) {
                acc += value.name + ' ';
            }
            return acc;
        }, '')
            .trim();
        return new naver_coordinate_location_dto_1.NaverCoordinateLocationDTO({
            ...query,
            address,
        });
    }
};
LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [location_repository_1.LocationRepository,
        cumuco_nestjs_1.SocialLocationService])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map