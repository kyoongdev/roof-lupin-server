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
exports.SpaceDetailDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../file/dto");
const dto_2 = require("../../host/dto");
const openHour_1 = require("../../host/dto/openHour");
const dto_3 = require("../../location/dto");
const dto_4 = require("../../review/dto");
const review_dto_1 = require("../../review/dto/review.dto");
const category_1 = require("./category");
const caution_1 = require("./caution");
const facility_1 = require("./facility");
const holiday_1 = require("./holiday");
const refund_1 = require("./refund");
const service_1 = require("./service");
const size_1 = require("./size");
const transportaion_1 = require("./transportaion");
class SpaceDetailDTO {
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.averageScore = props.averageScore ? Number(props.averageScore.toFixed(1)) : 0;
        this.reviewCount = props.reviewCount;
        this.isBest = props.isBest ?? false;
        this.thumbnail = props.thumbnail;
        this.location = props.location ? new dto_3.LocationDTO(props.location) : null;
        this.description = props.description;
        this.minSize = props.minSize;
        this.buildingType = props.buildingType ?? null;
        this.minUser = props.minUser;
        this.maxUser = props.maxUser;
        this.deposit = props.deposit ?? null;
        this.orderNo = props.orderNo;
        this.overflowUserCost = props.overflowUserCost;
        this.overflowUserCount = props.overflowUserCount;
        this.qnaCount = props.qnaCount;
        this.isInterested = props.isInterested ?? false;
        this.isImmediateReservation = props.isImmediateReservation;
        this.host = new dto_2.HostDTO(props.host);
        this.images = props.images.map((image) => new dto_1.ImageDTO(image));
        this.refundPolicies = props.refundPolicies.map((refundPolicy) => new refund_1.RefundPolicyDTO(refundPolicy));
        this.cautions = props.cautions.map((caution) => new caution_1.CautionDTO(caution));
        this.buildings = props.buildings.map((building) => new facility_1.BuildingDTO(building));
        this.services = props.services.map((service) => new service_1.ServiceDTO(service));
        this.categories = props.categories.map((category) => new category_1.SpaceCategoryDTO(category));
        this.publicTransportations = props.publicTransportations.map((publicTransportation) => new transportaion_1.TransportationDTO(publicTransportation));
        this.sizes = props.sizes.map((size) => new size_1.SizeDTO(size));
        this.reviews = props.reviews.map((review) => new review_dto_1.ReviewDTO(review));
        this.bestPhotos = props.bestPhotos.map((bestPhoto) => new dto_4.BestPhotoDTO(bestPhoto));
        this.openHours = props.openHours.map((openHour) => new openHour_1.OpenHourDTO(openHour));
        this.holidays = props.holidays ? props.holidays.map((holiday) => new holiday_1.SpaceHolidayDTO(holiday)) : null;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 id' } }),
    __metadata("design:type", String)
], SpaceDetailDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 제목' } }),
    __metadata("design:type", String)
], SpaceDetailDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 평점' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "averageScore", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 리뷰 개수' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "reviewCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '보증금' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "deposit", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '공간 베스트 여부' } }),
    __metadata("design:type", Boolean)
], SpaceDetailDTO.prototype, "isBest", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 썸네일' } }),
    __metadata("design:type", String)
], SpaceDetailDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_3.LocationDTO, description: '공간 위치', nullable: true } }),
    __metadata("design:type", dto_3.LocationDTO)
], SpaceDetailDTO.prototype, "location", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 설명' } }),
    __metadata("design:type", String)
], SpaceDetailDTO.prototype, "description", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 최소 크기' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "minSize", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '건물 타입', nullable: true } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "buildingType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 최소 인원' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "minUser", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 최대 인원' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "maxUser", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '초과 인원 당 추가 금액' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "overflowUserCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '초과 인원' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "overflowUserCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 Q&A 개수' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "qnaCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 순서' } }),
    __metadata("design:type", Number)
], SpaceDetailDTO.prototype, "orderNo", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '찜 여부' } }),
    __metadata("design:type", Boolean)
], SpaceDetailDTO.prototype, "isInterested", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_2.HostDTO, description: '호스트 정보' } }),
    __metadata("design:type", dto_2.HostDTO)
], SpaceDetailDTO.prototype, "host", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '즉시 예약 가능 여부' } }),
    __metadata("design:type", Boolean)
], SpaceDetailDTO.prototype, "isImmediateReservation", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.ImageDTO, isArray: true, description: '공간 이미지 목록' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "images", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: refund_1.RefundPolicyDTO, isArray: true, description: '환불 정책' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "refundPolicies", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: review_dto_1.ReviewDTO, isArray: true, description: '리뷰 목록' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "reviews", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: caution_1.CautionDTO, isArray: true, description: '주의 사항 목록' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "cautions", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: facility_1.BuildingDTO, isArray: true, description: '시설 목록' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "buildings", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: service_1.ServiceDTO, isArray: true, description: '서비스 목록' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "services", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: category_1.SpaceCategoryDTO, isArray: true, description: '공간 카테고리 목록' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "categories", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: transportaion_1.TransportationDTO, isArray: true, description: '대중교통 목록' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "publicTransportations", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: size_1.SizeDTO, isArray: true, description: '공간 크기 목록' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "sizes", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_4.BestPhotoDTO, isArray: true, description: '베스트 포토' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "bestPhotos", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: openHour_1.OpenHourDTO, isArray: true, description: '영업시간' } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "openHours", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: holiday_1.SpaceHolidayDTO, isArray: true } }),
    __metadata("design:type", Array)
], SpaceDetailDTO.prototype, "holidays", void 0);
exports.SpaceDetailDTO = SpaceDetailDTO;
//# sourceMappingURL=space-detail.dto.js.map