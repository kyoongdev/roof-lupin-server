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
exports.ExhibitionDetailDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const dto_1 = require("../../coupon/dto");
const dto_2 = require("../../file/dto");
const dto_3 = require("../../space/dto");
const exhibition_dto_1 = require("./exhibition.dto");
class ExhibitionDetailDTO extends exhibition_dto_1.ExhibitionDTO {
    constructor(props) {
        super(props);
        this.spaces = props.spaces.map((space) => new dto_3.SpaceDTO(space));
        this.coupons = props.coupons.map((coupon) => new dto_1.CouponDTO(coupon));
        this.images = props.images.map((image) => new dto_2.ImageDTO(image));
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_3.SpaceDTO, isArray: true, description: '연관 공간들' } }),
    __metadata("design:type", Array)
], ExhibitionDetailDTO.prototype, "spaces", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_1.CouponDTO, isArray: true, description: '연관 쿠폰들' } }),
    __metadata("design:type", Array)
], ExhibitionDetailDTO.prototype, "coupons", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: dto_2.ImageDTO, isArray: true, description: '이미지' } }),
    __metadata("design:type", Array)
], ExhibitionDetailDTO.prototype, "images", void 0);
exports.ExhibitionDetailDTO = ExhibitionDetailDTO;
//# sourceMappingURL=exhibition-detail.dto.js.map