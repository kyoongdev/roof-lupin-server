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
exports.SpaceDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../location/dto");
const category_1 = require("./category");
const transportaion_1 = require("./transportaion");
class SpaceDTO {
    constructor(props) {
        const timeRentals = props.rentalType.filter((target) => target.rentalType === 1);
        const packageRentals = props.rentalType.filter((target) => target.rentalType === 2);
        this.id = props.id;
        this.title = props.title;
        this.averageScore = props.averageScore ? Number(props.averageScore.toFixed(1)) : 0;
        this.reviewCount = props.reviewCount ?? 0;
        this.hostId = props.hostId;
        this.isInterested = props.isInterested ?? false;
        this.reportCount = props.reportCount ?? 0;
        this.isImmediateReservation = props.isImmediateReservation;
        this.isPublic = typeof props.isPublic === 'boolean' ? props.isPublic : props.isPublic === 1;
        this.isApproved = typeof props.isApproved === 'boolean' ? props.isApproved : props.isApproved === 1;
        this.thumbnail = props.thumbnail;
        this.interestCount = props.interestCount ?? 0;
        this.publicTransportations = props.publicTransportations.map((target) => new transportaion_1.TransportationDTO(target));
        this.location = props.location ? new dto_1.LocationDTO(props.location) : null;
        this.timeCost = timeRentals.length === 0 ? null : Math.min(...timeRentals.map((target) => target.baseCost));
        this.packageCost =
            packageRentals.length === 0 ? null : Math.min(...packageRentals.map((target) => target.baseCost));
        this.orderNo = props.orderNo ?? null;
        this.categories = props.categories ? props.categories?.map((category) => new category_1.SpaceCategoryDTO(category)) : [];
    }
    static generateSpaceDTO(space, userId) {
        return {
            ...space,
            reviewCount: space.reviews.length,
            location: space.location,
            averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
            isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
            categories: space.categories ? space.categories?.map(({ category }) => category) : [],
            reportCount: space.reports.length,
            interestCount: space.userInterests.length,
        };
    }
    static getSpacesIncludeOption() {
        return {
            location: true,
            reviews: true,
            publicTransportations: true,
            userInterests: true,
            rentalType: true,
            categories: {
                include: {
                    category: true,
                },
            },
            reports: true,
        };
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 id' } }),
    __metadata("design:type", String)
], SpaceDTO.prototype, "id", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 제목' } }),
    __metadata("design:type", String)
], SpaceDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 평점' } }),
    __metadata("design:type", Number)
], SpaceDTO.prototype, "averageScore", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 리뷰 개수' } }),
    __metadata("design:type", Number)
], SpaceDTO.prototype, "reviewCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '공간 신고 개수' } }),
    __metadata("design:type", Number)
], SpaceDTO.prototype, "reportCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '공간 시간 최소 가격' } }),
    __metadata("design:type", Number)
], SpaceDTO.prototype, "timeCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '공간 패키지 최소 가격' } }),
    __metadata("design:type", Number)
], SpaceDTO.prototype, "packageCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '찜 여부' } }),
    __metadata("design:type", Boolean)
], SpaceDTO.prototype, "isInterested", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '노출 여부' } }),
    __metadata("design:type", Boolean)
], SpaceDTO.prototype, "isPublic", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '승인 여부' } }),
    __metadata("design:type", Boolean)
], SpaceDTO.prototype, "isApproved", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '찜 개수' } }),
    __metadata("design:type", Number)
], SpaceDTO.prototype, "interestCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '즉각 예약 여부' } }),
    __metadata("design:type", Boolean)
], SpaceDTO.prototype, "isImmediateReservation", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '공간 썸네일' } }),
    __metadata("design:type", String)
], SpaceDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '호스트 id' } }),
    __metadata("design:type", String)
], SpaceDTO.prototype, "hostId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: transportaion_1.TransportationDTO, isArray: true, nullable: true, description: '공간 대중 교통' } }),
    __metadata("design:type", Array)
], SpaceDTO.prototype, "publicTransportations", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.LocationDTO, nullable: true, description: '공간 위치' } }),
    __metadata("design:type", dto_1.LocationDTO)
], SpaceDTO.prototype, "location", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '공간 순서' } }),
    __metadata("design:type", Number)
], SpaceDTO.prototype, "orderNo", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({
        apiProperty: { type: category_1.SpaceCategoryDTO, isArray: true, description: '공간이 속한 카테고리' },
    }),
    __metadata("design:type", Array)
], SpaceDTO.prototype, "categories", void 0);
exports.SpaceDTO = SpaceDTO;
//# sourceMappingURL=space.dto.js.map