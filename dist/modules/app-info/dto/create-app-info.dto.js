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
exports.CreateAppInfoDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
class CreateAppInfoDTO {
    constructor(props) {
        if (props) {
            this.iosVersion = props.iosVersion;
            this.androidVersion = props.androidVersion;
        }
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], CreateAppInfoDTO.prototype, "iosVersion", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string' } }),
    __metadata("design:type", String)
], CreateAppInfoDTO.prototype, "androidVersion", void 0);
exports.CreateAppInfoDTO = CreateAppInfoDTO;
//# sourceMappingURL=create-app-info.dto.js.map