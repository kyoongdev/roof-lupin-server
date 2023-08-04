"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const encrypt_1 = require("../../common/encrypt");
const fcm_1 = require("../../event/fcm");
const scheduler_1 = require("../../event/scheduler");
const alarm_repository_1 = require("../alarm/alarm.repository");
const category_repository_1 = require("../category/category.repository");
const coupon_repository_1 = require("../coupon/coupon.repository");
const curation_repository_1 = require("../curation/curation.repository");
const exhibition_repository_1 = require("../exhibition/exhibition.repository");
const faq_repository_1 = require("../faq/faq.repository");
const file_service_1 = require("../file/file.service");
const frequent_question_repository_1 = require("../frequent-question/frequent-question.repository");
const host_repository_1 = require("../host/host.repository");
const settlement_repository_1 = require("../host/settlement/settlement.repository");
const location_repository_1 = require("../location/location.repository");
const qna_repository_1 = require("../qna/qna.repository");
const ranking_repository_1 = require("../ranking/ranking.repository");
const report_repository_1 = require("../report/report.repository");
const reservation_repository_1 = require("../reservation/reservation.repository");
const review_repository_1 = require("../review/review.repository");
const search_repository_1 = require("../search/search.repository");
const rental_type_repository_1 = require("../space/rental-type/rental-type.repository");
const space_repository_1 = require("../space/space.repository");
const user_repository_1 = require("../user/user.repository");
const admin_controller_1 = require("./admin.controller");
const admin_repository_1 = require("./admin.repository");
const admin_service_1 = require("./admin.service");
const alarm_controller_1 = require("./alarm/alarm.controller");
const alarm_service_1 = require("./alarm/alarm.service");
const category_controller_1 = require("./category/category.controller");
const category_service_1 = require("./category/category.service");
const coupon_controller_1 = require("./coupon/coupon.controller");
const coupon_repository_2 = require("./coupon/coupon.repository");
const coupon_service_1 = require("./coupon/coupon.service");
const curation_controller_1 = require("./curation/curation.controller");
const curation_service_1 = require("./curation/curation.service");
const exhibition_controller_1 = require("./exhibition/exhibition.controller");
const exhibition_service_1 = require("./exhibition/exhibition.service");
const faq_controller_1 = require("./faq/faq.controller");
const faq_service_1 = require("./faq/faq.service");
const frequent_question_controller_1 = require("./frequent-question/frequent-question.controller");
const frequent_question_service_1 = require("./frequent-question/frequent-question.service");
const home_controller_1 = require("./home/home.controller");
const home_service_1 = require("./home/home.service");
const host_controller_1 = require("./host/host.controller");
const host_service_1 = require("./host/host.service");
const icon_controller_1 = require("./icon/icon.controller");
const icon_repository_1 = require("./icon/icon.repository");
const icon_service_1 = require("./icon/icon.service");
const qna_1 = require("./qna");
const qna_service_1 = require("./qna/qna.service");
const ranking_controller_1 = require("./ranking/ranking.controller");
const ranking_service_1 = require("./ranking/ranking.service");
const report_controller_1 = require("./report/report.controller");
const report_service_1 = require("./report/report.service");
const reservation_controller_1 = require("./reservation/reservation.controller");
const reservation_service_1 = require("./reservation/reservation.service");
const review_controller_1 = require("./review/review.controller");
const review_service_1 = require("./review/review.service");
const search_controller_1 = require("./search/search.controller");
const search_service_1 = require("./search/search.service");
const settlement_controller_1 = require("./settlement/settlement.controller");
const settlement_service_1 = require("./settlement/settlement.service");
const space_controller_1 = require("./space/space.controller");
const space_service_1 = require("./space/space.service");
const terms_controller_1 = require("./terms/terms.controller");
const terms_service_1 = require("./terms/terms.service");
const user_controller_1 = require("./user/user.controller");
const user_repository_2 = require("./user/user.repository");
const user_service_1 = require("./user/user.service");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        providers: [
            admin_service_1.AdminService,
            admin_repository_1.AdminRepository,
            review_service_1.AdminReviewService,
            review_repository_1.ReviewRepository,
            qna_service_1.AdminQnAService,
            qna_repository_1.QnARepository,
            report_service_1.AdminReportService,
            report_repository_1.ReportRepository,
            host_service_1.AdminHostService,
            host_repository_1.HostRepository,
            reservation_service_1.AdminReservationService,
            reservation_repository_1.ReservationRepository,
            alarm_service_1.AdminAlarmService,
            alarm_repository_1.AlarmRepository,
            space_service_1.AdminSpaceService,
            space_repository_1.SpaceRepository,
            scheduler_1.SchedulerEvent,
            location_repository_1.LocationRepository,
            rental_type_repository_1.RentalTypeRepository,
            settlement_service_1.AdminSettlementService,
            settlement_repository_1.SettlementRepository,
            coupon_service_1.AdminCouponService,
            coupon_repository_1.CouponRepository,
            coupon_repository_2.AdminCouponRepository,
            category_repository_1.CategoryRepository,
            user_repository_1.UserRepository,
            fcm_1.FCMEvent,
            exhibition_repository_1.ExhibitionRepository,
            exhibition_service_1.AdminExhibitionService,
            encrypt_1.EncryptProvider,
            file_service_1.FileService,
            user_service_1.AdminUserService,
            user_repository_2.AdminUserRepository,
            category_service_1.AdminCategoryService,
            category_repository_1.CategoryRepository,
            ranking_service_1.AdminRankingService,
            ranking_repository_1.RankingRepository,
            home_service_1.AdminHomeService,
            search_service_1.AdminSearchService,
            search_repository_1.SearchRepository,
            frequent_question_service_1.AdminFrequentQuestionService,
            frequent_question_repository_1.FrequentQuestionRepository,
            icon_service_1.AdminIconService,
            icon_repository_1.IconRepository,
            faq_service_1.AdminFaqService,
            faq_repository_1.FaqRepository,
            curation_service_1.AdminCurationService,
            curation_repository_1.CurationRepository,
            terms_service_1.AdminTermsService,
        ],
        controllers: [
            admin_controller_1.AdminController,
            review_controller_1.AdminReviewController,
            qna_1.AdminQnAController,
            report_controller_1.AdminReportController,
            host_controller_1.AdminHostController,
            reservation_controller_1.AdminReservationController,
            alarm_controller_1.AdminAlarmController,
            space_controller_1.AdminSpaceController,
            settlement_controller_1.AdminSettlementController,
            coupon_controller_1.AdminCouponController,
            exhibition_controller_1.AdminExhibitionController,
            user_controller_1.AdminUserController,
            category_controller_1.AdminCategoryController,
            ranking_controller_1.AdminRankingController,
            home_controller_1.AdminHomeController,
            search_controller_1.AdminSearchController,
            frequent_question_controller_1.AdminFrequentlyQuestionController,
            icon_controller_1.AdminIconController,
            faq_controller_1.AdminFaqController,
            curation_controller_1.AdminCurationController,
            terms_controller_1.AdminTermsController,
        ],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map