"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceModule = void 0;
const common_1 = require("@nestjs/common");
const holiday_service_1 = require("../holiday/holiday.service");
const blocked_time_repository_1 = require("../host/blocked-time/blocked-time.repository");
const open_hour_repository_1 = require("../host/open-hour/open-hour.repository");
const space_holiday_repository_1 = require("../host/space-holiday/space-holiday.repository");
const search_repository_1 = require("../search/search.repository");
const rental_type_controller_1 = require("./rental-type/rental-type.controller");
const rental_type_repository_1 = require("./rental-type/rental-type.repository");
const rental_type_service_1 = require("./rental-type/rental-type.service");
const space_controller_1 = require("./space.controller");
const space_repository_1 = require("./space.repository");
const space_service_1 = require("./space.service");
let SpaceModule = class SpaceModule {
};
SpaceModule = __decorate([
    (0, common_1.Module)({
        providers: [
            space_service_1.SpaceService,
            space_repository_1.SpaceRepository,
            rental_type_repository_1.RentalTypeRepository,
            holiday_service_1.HolidayService,
            search_repository_1.SearchRepository,
            rental_type_service_1.RentalTypeService,
            blocked_time_repository_1.BlockedTimeRepository,
            open_hour_repository_1.OpenHourRepository,
            space_holiday_repository_1.SpaceHolidayRepository,
        ],
        controllers: [space_controller_1.SpaceController, rental_type_controller_1.RentalTypeController],
    })
], SpaceModule);
exports.SpaceModule = SpaceModule;
//# sourceMappingURL=space.module.js.map