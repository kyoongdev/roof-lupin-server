"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayModule = void 0;
const common_1 = require("@nestjs/common");
const holiday_controller_1 = require("./holiday.controller");
const holiday_service_1 = require("./holiday.service");
let HolidayModule = class HolidayModule {
};
HolidayModule = __decorate([
    (0, common_1.Module)({
        providers: [holiday_service_1.HolidayService],
        controllers: [holiday_controller_1.HolidayController],
    })
], HolidayModule);
exports.HolidayModule = HolidayModule;
//# sourceMappingURL=holiday.module.js.map