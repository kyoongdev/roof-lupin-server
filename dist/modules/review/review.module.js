"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file/file.service");
const reservation_repository_1 = require("../reservation/reservation.repository");
const rental_type_repository_1 = require("../space/rental-type/rental-type.repository");
const space_repository_1 = require("../space/space.repository");
const review_controller_1 = require("./review.controller");
const review_repository_1 = require("./review.repository");
const review_service_1 = require("./review.service");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    (0, common_1.Module)({
        controllers: [review_controller_1.ReviewController],
        providers: [
            review_service_1.ReviewService,
            space_repository_1.SpaceRepository,
            review_repository_1.ReviewRepository,
            rental_type_repository_1.RentalTypeRepository,
            reservation_repository_1.ReservationRepository,
            file_service_1.FileService,
        ],
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=review.module.js.map