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
exports.AdminFindSpacesQuery = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const space_sort_validation_1 = require("../../validation/space-sort.validation");
class AdminFindSpacesQuery extends cumuco_nestjs_1.PagingDTO {
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '공간 이름' } }),
    __metadata("design:type", String)
], AdminFindSpacesQuery.prototype, "title", void 0);
__decorate([
    (0, cumuco_nestjs_1.ToBoolean)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '공간 승인 여부' } }),
    __metadata("design:type", Boolean)
], AdminFindSpacesQuery.prototype, "isApproved", void 0);
__decorate([
    (0, cumuco_nestjs_1.ToBoolean)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', nullable: true, description: '공간 노출 여부' } }),
    __metadata("design:type", Boolean)
], AdminFindSpacesQuery.prototype, "isPublic", void 0);
__decorate([
    (0, space_sort_validation_1.AdminSpaceSortValidation)(),
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, enum: space_sort_validation_1.ADMIN_SPACE_SORT_OPTION_VALUES } }),
    __metadata("design:type", Object)
], AdminFindSpacesQuery.prototype, "sort", void 0);
exports.AdminFindSpacesQuery = AdminFindSpacesQuery;
//# sourceMappingURL=find-spaces.query.js.map