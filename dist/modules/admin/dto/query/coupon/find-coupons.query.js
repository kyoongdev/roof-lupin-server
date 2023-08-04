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
exports.AdminFindCouponsQuery = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class AdminFindCouponsQuery extends cumuco_nestjs_1.PagingDTO {
    generateQuery() {
        return {
            where: {
                ...(this.name && {
                    name: {
                        contains: this.name,
                    },
                }),
            },
        };
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'name', nullable: true, description: '쿠폰 이름' } }),
    __metadata("design:type", String)
], AdminFindCouponsQuery.prototype, "name", void 0);
exports.AdminFindCouponsQuery = AdminFindCouponsQuery;
//# sourceMappingURL=find-coupons.query.js.map