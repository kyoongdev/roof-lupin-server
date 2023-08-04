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
exports.CreateUserCouponDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class CreateUserCouponDTO {
    constructor(props) {
        if (props) {
            this.count = props.count;
            this.userId = props.userId;
            this.usageDateStartAt = props.usageDateStartAt;
            this.usageDateEndAt = props.usageDateEndAt;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } }),
    __metadata("design:type", Number)
], CreateUserCouponDTO.prototype, "count", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '유저 id' } }),
    __metadata("design:type", String)
], CreateUserCouponDTO.prototype, "userId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '쿠폰 사용 시작기간' } }),
    __metadata("design:type", Date)
], CreateUserCouponDTO.prototype, "usageDateStartAt", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '쿠폰 사용 종료기간' } }),
    __metadata("design:type", Date)
], CreateUserCouponDTO.prototype, "usageDateEndAt", void 0);
exports.CreateUserCouponDTO = CreateUserCouponDTO;
//# sourceMappingURL=create-user-coupon.dto.js.map