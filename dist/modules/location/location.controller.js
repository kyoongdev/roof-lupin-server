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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const utils_1 = require("../../utils");
const dto_1 = require("./dto");
const naver_coordinate_location_dto_1 = require("./dto/naver/naver-coordinate-location.dto");
const query_1 = require("./dto/query");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    async findNaverLocation(query) {
        return await this.locationService.findNaverLocation(query);
    }
    async findNaverLocationByCoordinate(query) {
        return await this.locationService.findNaverLocationByCoordinate(query);
    }
};
__decorate([
    (0, common_1.Get)('naver/geocode'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '네이버 지도 API를 이용하여 주소를 좌표로 변환합니다.',
            summary: '네이버 지도 API를 이용하여 주소를 좌표로 변환합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: dto_1.NaverLocationDTO,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.NaverGeocodeQuery]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findNaverLocation", null);
__decorate([
    (0, common_1.Get)('naver/coordinate'),
    (0, cumuco_nestjs_1.RequestApi)({
        summary: {
            description: '네이버 지도 API를 이용하여 좌표를 주소로 변환합니다.',
            summary: '네이버 지도 API를 이용하여 좌표를 주소로 변환합니다.',
        },
    }),
    (0, cumuco_nestjs_1.ResponseApi)({
        type: naver_coordinate_location_dto_1.NaverCoordinateLocationDTO,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.NaverCoordinateQuery]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findNaverLocationByCoordinate", null);
LocationController = __decorate([
    (0, utils_1.ApiController)('locations', '지도 / 위치 '),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map