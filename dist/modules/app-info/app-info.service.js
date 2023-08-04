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
exports.AppInfoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const app_info_exception_1 = require("./exception/app-info.exception");
const errorCode_1 = require("./exception/errorCode");
let AppInfoService = class AppInfoService {
    constructor(database) {
        this.database = database;
    }
    async findAppInfoById(id) {
        const appInfo = await this.database.appInfo.findUnique({
            where: {
                id,
            },
        });
        if (!appInfo) {
            throw new app_info_exception_1.AppInfoException(errorCode_1.APP_INFO_ERROR_CODE.NOT_FOUND(errorCode_1.APP_INFO_NOT_FOUND));
        }
        return new dto_1.AppInfoDTO(appInfo);
    }
    async findAppInfos() {
        const appInfos = await this.database.appInfo.findMany();
        return appInfos.map((appInfo) => new dto_1.AppInfoDTO(appInfo));
    }
    async createAppInfo(data) {
        const appInfo = await this.database.appInfo.create({
            data,
        });
        return appInfo.id;
    }
    async updateAppInfo(id, data) {
        await this.findAppInfoById(id);
        await this.database.appInfo.update({
            where: {
                id,
            },
            data,
        });
    }
    async deleteAppInfo(id) {
        await this.findAppInfoById(id);
        await this.database.appInfo.delete({
            where: {
                id,
            },
        });
    }
};
AppInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppInfoService);
exports.AppInfoService = AppInfoService;
//# sourceMappingURL=app-info.service.js.map