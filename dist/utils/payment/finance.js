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
exports.FinanceProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const nanoid_1 = require("nanoid");
const log_1 = require("../../log");
let FinanceProvider = class FinanceProvider {
    constructor(configService) {
        this.configService = configService;
        this.apiClient = axios_1.default.create({
            baseURL: 'https://testapi.openbanking.or.kr',
        });
    }
    async getCode() {
        try {
            const response = await this.apiClient.get('/oauth/2.0/authorize', {
                params: {
                    response_type: 'code',
                    client_id: this.configService.get('FINANCE_OPEN_API_CLIENT_ID'),
                    redirect_uri: this.configService.get('FINANCE_OPEN_API_REDIRECT_URL'),
                    scope: 'login inquiry transfer',
                    state: (0, nanoid_1.nanoid)(32),
                    auth_type: 1,
                },
            });
            return response.data;
        }
        catch (err) {
            log_1.logger.log(err);
        }
    }
    async getToken() {
        try {
            const response = await this.apiClient.post('/oauth/2.0/token', undefined, {
                params: {
                    client_id: this.configService.get('FINANCE_OPEN_API_CLIENT_ID'),
                    client_secret: this.configService.get('FINANCE_OPEN_API_CLIENT_SECRET'),
                    grant_type: 'client_credentials',
                    scope: 'oob',
                },
            });
        }
        catch (err) {
            log_1.logger.log(err);
        }
    }
    getHeaders(token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
};
FinanceProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FinanceProvider);
exports.FinanceProvider = FinanceProvider;
//# sourceMappingURL=finance.js.map