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
exports.UpdateSizeDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class UpdateSizeDTO {
    constructor(props) {
        if (props) {
            this.size = props.size;
            this.floor = props.floor;
            this.isRoof = props.isRoof;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '면적' } }),
    __metadata("design:type", Number)
], UpdateSizeDTO.prototype, "size", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '층수' } }),
    __metadata("design:type", Number)
], UpdateSizeDTO.prototype, "floor", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'boolean', description: '옥탑여부' } }),
    __metadata("design:type", Boolean)
], UpdateSizeDTO.prototype, "isRoof", void 0);
exports.UpdateSizeDTO = UpdateSizeDTO;
//# sourceMappingURL=update-size.dto.js.map