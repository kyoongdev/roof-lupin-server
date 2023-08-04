"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const rental_type_repository_1 = require("../space/rental-type/rental-type.repository");
const space_repository_1 = require("../space/space.repository");
const user_repository_1 = require("../user/user.repository");
const report_controller_1 = require("./report.controller");
const report_repository_1 = require("./report.repository");
const report_service_1 = require("./report.service");
let ReportModule = class ReportModule {
};
ReportModule = __decorate([
    (0, common_1.Module)({
        controllers: [report_controller_1.ReportController],
        providers: [report_service_1.ReportService, report_repository_1.ReportRepository, space_repository_1.SpaceRepository, user_repository_1.UserRepository, rental_type_repository_1.RentalTypeRepository],
    })
], ReportModule);
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map