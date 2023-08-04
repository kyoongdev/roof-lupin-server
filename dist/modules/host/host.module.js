"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostModule = void 0;
const common_1 = require("@nestjs/common");
const encrypt_1 = require("../../common/encrypt");
const fcm_1 = require("../../event/fcm");
const file_service_1 = require("../file/file.service");
const location_repository_1 = require("../location/location.repository");
const qna_repository_1 = require("../qna/qna.repository");
const report_repository_1 = require("../report/report.repository");
const reservation_repository_1 = require("../reservation/reservation.repository");
const review_repository_1 = require("../review/review.repository");
const rental_type_repository_1 = require("../space/rental-type/rental-type.repository");
const space_repository_1 = require("../space/space.repository");
const tax_return_repository_1 = require("../tax-return/tax-return.repository");
const blocked_time_controller_1 = require("./blocked-time/blocked-time.controller");
const blocked_time_repository_1 = require("./blocked-time/blocked-time.repository");
const blocked_time_service_1 = require("./blocked-time/blocked-time.service");
const host_controller_1 = require("./host.controller");
const host_repository_1 = require("./host.repository");
const host_service_1 = require("./host.service");
const qna_controller_1 = require("./qna/qna.controller");
const qna_service_1 = require("./qna/qna.service");
const report_controller_1 = require("./report/report.controller");
const report_service_1 = require("./report/report.service");
const reservation_controller_1 = require("./reservation/reservation.controller");
const reservation_service_1 = require("./reservation/reservation.service");
const review_controller_1 = require("./review/review.controller");
const review_service_1 = require("./review/review.service");
const settlement_controller_1 = require("./settlement/settlement.controller");
const settlement_repository_1 = require("./settlement/settlement.repository");
const settlement_service_1 = require("./settlement/settlement.service");
const space_controller_1 = require("./space/space.controller");
const space_service_1 = require("./space/space.service");
const tax_return_controller_1 = require("./tax-return/tax-return.controller");
const tax_return_service_1 = require("./tax-return/tax-return.service");
let HostModule = class HostModule {
};
HostModule = __decorate([
    (0, common_1.Module)({
        providers: [
            host_service_1.HostService,
            host_repository_1.HostRepository,
            review_service_1.HostReviewService,
            review_repository_1.ReviewRepository,
            qna_service_1.HostQnAService,
            qna_repository_1.QnARepository,
            report_service_1.HostReportService,
            report_repository_1.ReportRepository,
            space_service_1.HostSpaceService,
            space_repository_1.SpaceRepository,
            location_repository_1.LocationRepository,
            rental_type_repository_1.RentalTypeRepository,
            tax_return_service_1.HostTaxReturnService,
            tax_return_repository_1.TaxReturnRepository,
            settlement_service_1.SettlementService,
            settlement_repository_1.SettlementRepository,
            blocked_time_repository_1.BlockedTimeRepository,
            blocked_time_service_1.BlockedTimeService,
            reservation_repository_1.ReservationRepository,
            encrypt_1.EncryptProvider,
            file_service_1.FileService,
            reservation_service_1.HostReservationService,
            reservation_repository_1.ReservationRepository,
            fcm_1.FCMEvent,
        ],
        controllers: [
            host_controller_1.HostController,
            review_controller_1.HostReviewController,
            qna_controller_1.HostQnAController,
            report_controller_1.HostReportController,
            space_controller_1.HostSpaceController,
            tax_return_controller_1.HostTaxReturnController,
            settlement_controller_1.SettlementController,
            blocked_time_controller_1.BlockedTimeController,
            reservation_controller_1.HostReservationController,
        ],
    })
], HostModule);
exports.HostModule = HostModule;
//# sourceMappingURL=host.module.js.map