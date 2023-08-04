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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaverProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let NaverProvider = class NaverProvider {
    constructor(configService) {
        this.configService = configService;
        this.apiClient = axios_1.default.create({
            baseURL: 'https://dev.apis.naver.com',
        });
    }
    getPayReserveParameters(data, rentalTypes, user, orderId) {
        return {
            merchantPayKey: orderId,
            merchantUserKey: this.configService.get('NAVERPAY_MERCHANT_USER_KEY'),
            productName: rentalTypes.reduce((acc, next) => {
                acc += next.name + ' | ';
                return acc;
            }, ''),
            productCount: data.rentalTypes.length,
            totalPayAmount: data.totalCost,
            taxScopeAmount: data.totalCost,
            taxExScopeAmount: 0,
            returnUrl: this.configService.get('NAVERPAY_RETURN_URL'),
            purchaserName: data.userName,
            purchaserBirthDay: user.birthYear + user.birthDay,
            productItems: rentalTypes.map((rentalType) => ({
                categoryId: 'GENERAL',
                categoryType: 'PRODUCT',
                uid: rentalType.id,
                name: rentalType.name,
                count: 1,
                endDate: null,
                payReferrer: null,
                sellerId: null,
                startDate: null,
            })),
        };
    }
    async approvePayment(paymentId) {
        try {
        }
        catch (err) {
            console.log(err);
        }
    }
};
NaverProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NaverProvider);
exports.NaverProvider = NaverProvider;
//# sourceMappingURL=naver.js.map