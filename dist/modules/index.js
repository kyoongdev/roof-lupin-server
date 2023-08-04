"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1Module = exports.Modules = void 0;
const common_1 = require("@nestjs/common");
const alarm_module_1 = require("./alarm/alarm.module");
const announcement_module_1 = require("./announcement/announcement.module");
const app_info_module_1 = require("./app-info/app-info.module");
const auth_module_1 = require("./auth/auth.module");
const category_module_1 = require("./category/category.module");
const coupon_module_1 = require("./coupon/coupon.module");
const curation_module_1 = require("./curation/curation.module");
const exhibition_module_1 = require("./exhibition/exhibition.module");
const faq_module_1 = require("./faq/faq.module");
const file_module_1 = require("./file/file.module");
const frequent_question_module_1 = require("./frequent-question/frequent-question.module");
const holiday_module_1 = require("./holiday/holiday.module");
const home_module_1 = require("./home/home.module");
const location_module_1 = require("./location/location.module");
const main_module_1 = require("./main/main.module");
const payment_module_1 = require("./payment/payment.module");
const qna_module_1 = require("./qna/qna.module");
const ranking_module_1 = require("./ranking/ranking.module");
const report_module_1 = require("./report/report.module");
const reservation_module_1 = require("./reservation/reservation.module");
const review_module_1 = require("./review/review.module");
const search_module_1 = require("./search/search.module");
const space_module_1 = require("./space/space.module");
const tax_return_module_1 = require("./tax-return/tax-return.module");
const terms_module_1 = require("./terms/terms.module");
const user_module_1 = require("./user/user.module");
exports.Modules = [
    space_module_1.SpaceModule,
    user_module_1.UserModule,
    tax_return_module_1.TaxReturnModule,
    report_module_1.ReportModule,
    review_module_1.ReviewModule,
    qna_module_1.QnaModule,
    auth_module_1.AuthModule,
    coupon_module_1.CouponModule,
    file_module_1.FileModule,
    home_module_1.HomeModule,
    app_info_module_1.AppInfoModule,
    announcement_module_1.AnnouncementModule,
    faq_module_1.FaqModule,
    search_module_1.SearchModule,
    location_module_1.LocationModule,
    reservation_module_1.ReservationModule,
    alarm_module_1.AlarmModule,
    main_module_1.MainModule,
    category_module_1.CategoryModule,
    curation_module_1.CurationModule,
    payment_module_1.PaymentModule,
    exhibition_module_1.ExhibitionModule,
    holiday_module_1.HolidayModule,
    ranking_module_1.RankingModule,
    frequent_question_module_1.FrequentQuestionModule,
    terms_module_1.TermsModule,
];
let V1Module = class V1Module {
};
V1Module = __decorate([
    (0, common_1.Module)({
        imports: [...exports.Modules],
    })
], V1Module);
exports.V1Module = V1Module;
//# sourceMappingURL=index.js.map