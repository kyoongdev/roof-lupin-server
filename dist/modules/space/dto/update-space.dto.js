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
exports.UpdateSpaceDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const lodash_1 = require("lodash");
const openHour_1 = require("../../host/dto/openHour");
const dto_1 = require("../../location/dto");
const errorCode_1 = require("../exception/errorCode");
const space_exception_1 = require("../exception/space.exception");
const category_1 = require("./category");
const caution_1 = require("./caution");
const facility_1 = require("./facility");
const hashTag_1 = require("./hashTag");
const holiday_1 = require("./holiday");
const refund_1 = require("./refund");
const rental_type_1 = require("./rental-type");
const service_1 = require("./service");
const size_1 = require("./size");
const transportaion_1 = require("./transportaion");
class UpdateSpaceDTO {
    constructor(props) {
        if (props) {
            this.title = props.title;
            this.description = props.description;
            this.spaceType = props.spaceType;
            this.buildingType = props.buildingType;
            this.thumbnail = props.thumbnail;
            this.minUser = props.minUser;
            this.maxUser = props.maxUser;
            this.deposit = props.deposit;
            this.overflowUserCost = props.overflowUserCost;
            this.overflowUserCount = props.overflowUserCount;
            this.images = props.images;
            this.refundPolicies = props.refundPolicies;
            this.cautions = props.cautions;
            this.isImmediateReservation = props.isImmediateReservation;
            this.isApproved = props.isApproved;
            this.isPublic = props.isPublic;
            this.rentalTypes = props.rentalTypes.map((rentalType) => new rental_type_1.CreateRentalTypeDTO(rentalType));
            this.location = new dto_1.CreateLocationDTO(props.location);
            this.buildings = props.buildings.map((facility) => new facility_1.CreateBuildingDTO(facility));
            this.services = props.services.map((service) => new service_1.CreateServiceDTO(service));
            this.categories = props.categories.map((category) => new category_1.CreateSpaceCategoryDTO(category));
            this.hashTags = props.hashTags.map((hashtag) => new hashTag_1.UpdateHashTagDTO(hashtag));
            this.publicTransportations = props.publicTransportations.map((transportation) => new transportaion_1.CreateTransportationDTO(transportation));
            this.sizes = props.sizes.map((size) => new size_1.CreateSizeDTO(size));
            this.openHours = props.openHours.map((openHour) => new openHour_1.UpdateOpenHourDTO(openHour));
            this.holidays = props.holidays.map((holiday) => new holiday_1.UpdateSpaceHolidayDTO(holiday));
        }
    }
    validateRefundPolicies() {
        if (!this.refundPolicies)
            return;
        if (this.refundPolicies.length !== 9) {
            throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.BAD_REQUEST(errorCode_1.REFUND_POLICY_LENGTH));
        }
        (0, lodash_1.range)(0, 9).forEach((idx) => {
            const isExist = this.refundPolicies.find((refundPolicy) => refundPolicy.daysBefore === idx);
            if (!isExist) {
                throw new space_exception_1.SpaceException(errorCode_1.SPACE_ERROR_CODE.BAD_REQUEST(errorCode_1.REFUND_POLICY_DAYS_BEFORE_TYPE));
            }
        });
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '공간 제목' } }),
    __metadata("design:type", String)
], UpdateSpaceDTO.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '공간 설명' } }),
    __metadata("design:type", String)
], UpdateSpaceDTO.prototype, "description", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '공간 유형' } }),
    __metadata("design:type", Number)
], UpdateSpaceDTO.prototype, "spaceType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '건물 유형' } }),
    __metadata("design:type", Number)
], UpdateSpaceDTO.prototype, "buildingType", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '썸네일' } }),
    __metadata("design:type", String)
], UpdateSpaceDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '보증금' } }),
    __metadata("design:type", Number)
], UpdateSpaceDTO.prototype, "deposit", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '최소 인원' } }),
    __metadata("design:type", Number)
], UpdateSpaceDTO.prototype, "minUser", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '최대 인원' } }),
    __metadata("design:type", Number)
], UpdateSpaceDTO.prototype, "maxUser", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '초과 인원 당 추가 금액' } }),
    __metadata("design:type", Number)
], UpdateSpaceDTO.prototype, "overflowUserCost", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '초과 인원' } }),
    __metadata("design:type", Number)
], UpdateSpaceDTO.prototype, "overflowUserCount", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '노출 여부' } }),
    __metadata("design:type", Boolean)
], UpdateSpaceDTO.prototype, "isPublic", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '승인 여부' } }),
    __metadata("design:type", Boolean)
], UpdateSpaceDTO.prototype, "isApproved", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, isArray: true, description: '생성된 이미지 url' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "images", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '즉시 예약 가능 여부' } }),
    __metadata("design:type", Boolean)
], UpdateSpaceDTO.prototype, "isImmediateReservation", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: refund_1.CreateRefundPolicyDTO, nullable: true, isArray: true, description: '환불 정책' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "refundPolicies", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: caution_1.CreateCautionDTO, nullable: true, isArray: true, description: '주의 사항' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "cautions", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: rental_type_1.CreateRentalTypeDTO, nullable: true, isArray: true, description: '대여 유형' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "rentalTypes", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CreateLocationDTO, nullable: true, description: '위치' } }),
    __metadata("design:type", dto_1.CreateLocationDTO)
], UpdateSpaceDTO.prototype, "location", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: facility_1.CreateBuildingDTO, nullable: true, isArray: true, description: '시설' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "buildings", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: service_1.CreateServiceDTO, nullable: true, isArray: true, description: '서비스' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "services", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: category_1.CreateSpaceCategoryDTO, nullable: true, isArray: true, description: '카테고리' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "categories", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: hashTag_1.UpdateHashTagDTO, nullable: true, isArray: true, description: '해시태그' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "hashTags", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: transportaion_1.CreateTransportationDTO, nullable: true, isArray: true, description: '대중교통' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "publicTransportations", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: size_1.CreateSizeDTO, nullable: true, isArray: true, description: '면적' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "sizes", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: openHour_1.UpdateOpenHourDTO, isArray: true, description: '영업시간' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "openHours", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: holiday_1.UpdateSpaceHolidayDTO, isArray: true, nullable: true, description: '휴무일' } }),
    __metadata("design:type", Array)
], UpdateSpaceDTO.prototype, "holidays", void 0);
exports.UpdateSpaceDTO = UpdateSpaceDTO;
//# sourceMappingURL=update-space.dto.js.map