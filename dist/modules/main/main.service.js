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
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const prisma_service_1 = require("../../database/prisma.service");
const dto_1 = require("./dto");
const errorCode_1 = require("./exception/errorCode");
const main_exception_1 = require("./exception/main.exception");
let MainService = class MainService {
    constructor(database) {
        this.database = database;
    }
    async findMain() {
        const mainImage = await this.database.mainImage.findFirst({
            where: {
                isDefault: true,
            },
        });
        if (!mainImage) {
            throw new main_exception_1.MainException(errorCode_1.MAIN_ERROR_CODE.NOT_FOUND(errorCode_1.MAIN_IMAGE_NOT_FOUND));
        }
        const slogan = await this.database.slogan.findFirst({
            where: {
                isDefault: true,
            },
        });
        if (!slogan) {
            throw new main_exception_1.MainException(errorCode_1.MAIN_ERROR_CODE.NOT_FOUND(errorCode_1.SLOGAN_NOT_FOUND));
        }
        return new dto_1.MainDTO({
            mainImage: mainImage.url,
            mainImageId: mainImage.id,
            content: slogan.content,
            sloganId: slogan.id,
        });
    }
    async findMainImage(id) {
        const mainImage = await this.database.mainImage.findUnique({
            where: {
                id,
            },
        });
        if (!mainImage) {
            throw new main_exception_1.MainException(errorCode_1.MAIN_ERROR_CODE.NOT_FOUND(errorCode_1.MAIN_IMAGE_NOT_FOUND));
        }
        return mainImage;
    }
    async findMainImages(args = {}) {
        const mainImages = await this.database.mainImage.findMany(args);
        return mainImages.map((mainImage) => new dto_1.MainImageDTO(mainImage));
    }
    async countMainImages(args = {}) {
        return await this.database.mainImage.count(args);
    }
    async findPagingMainImages(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const mainImages = await this.findMainImages({
            where: args.where,
            skip,
            take,
        });
        const count = await this.countMainImages({
            where: args.where,
        });
        return new cumuco_nestjs_1.PaginationDTO(mainImages, { count, paging });
    }
    async createMainImage(data) {
        const count = await this.countDefaultMainImages();
        const transactionArgs = [];
        if (count === 0) {
            data.isDefault = true;
        }
        else if (count !== 0 && data.isDefault === true) {
            transactionArgs.push(this.updateMainImageDefaultToFalse());
        }
        transactionArgs.push(this.database.mainImage.create({
            data,
        }));
        const result = await this.database.$transaction(transactionArgs);
        const main = result.find((query) => !!query['id']);
        return main.id;
    }
    async updateMainImage(id, data) {
        const mainImage = await this.findMainImage(id);
        const count = await this.countDefaultMainImages();
        if (count === 1 && mainImage.isDefault === true && data.isDefault === false) {
            throw new main_exception_1.MainException(errorCode_1.MAIN_ERROR_CODE.CONFLICT(errorCode_1.MAIN_IMAGE_NO_DEFAULT));
        }
        const transactionArgs = [];
        if (data.isDefault === true) {
            transactionArgs.push(this.updateMainImageDefaultToFalse());
        }
        transactionArgs.push(this.database.mainImage.update({
            where: {
                id,
            },
            data,
        }));
        await this.database.$transaction(transactionArgs);
    }
    async deleteMainImage(id) {
        const mainImage = await this.findMainImage(id);
        const count = await this.countDefaultMainImages();
        if (count === 1 && mainImage.isDefault === true) {
            throw new main_exception_1.MainException(errorCode_1.MAIN_ERROR_CODE.CONFLICT(errorCode_1.MAIN_IMAGE_NO_DEFAULT));
        }
        await this.database.mainImage.delete({
            where: {
                id,
            },
        });
    }
    async findSlogan(id) {
        return await this.database.slogan.findUnique({
            where: {
                id,
            },
        });
    }
    async findSlogans(args = {}) {
        const slogans = await this.database.slogan.findMany(args);
        return slogans.map((slogan) => new dto_1.SloganDTO(slogan));
    }
    async countSlogans(args = {}) {
        return await this.database.slogan.count(args);
    }
    async findPagingSlogans(paging, args = {}) {
        const { skip, take } = paging.getSkipTake();
        const slogans = await this.findSlogans({
            where: args.where,
            skip,
            take,
        });
        const count = await this.countSlogans({ where: args.where });
        return new cumuco_nestjs_1.PaginationDTO(slogans, { count, paging });
    }
    async createSlogan(data) {
        const count = await this.countDefaultSlogan();
        const transactionArgs = [];
        if (count === 0) {
            data.isDefault = true;
        }
        else if (count !== 0 && data.isDefault === true) {
            transactionArgs.push(this.updateSloganDefaultToFalse());
        }
        transactionArgs.push(this.database.slogan.create({
            data,
        }));
        const result = await this.database.$transaction(transactionArgs);
        const slogan = result.find((query) => !!query['id']);
        return slogan.id;
    }
    async updateSlogan(id, data) {
        const slogan = await this.findSlogan(id);
        const count = await this.countDefaultSlogan();
        if (count === 1 && slogan.isDefault === true && data.isDefault === false) {
            throw new main_exception_1.MainException(errorCode_1.MAIN_ERROR_CODE.CONFLICT(errorCode_1.SLOGAN_NO_DEFAULT));
        }
        const transactionArgs = [];
        if (data.isDefault === true) {
        }
        transactionArgs.push(this.database.slogan.update({
            where: {
                id,
            },
            data,
        }));
        await this.database.$transaction(transactionArgs);
    }
    async deleteSlogan(id) {
        const slogan = await this.findSlogan(id);
        const count = await this.countDefaultSlogan();
        if (count === 1 && slogan.isDefault === true) {
            throw new main_exception_1.MainException(errorCode_1.MAIN_ERROR_CODE.CONFLICT(errorCode_1.SLOGAN_NO_DEFAULT));
        }
        await this.database.slogan.delete({
            where: {
                id,
            },
        });
    }
    async countDefaultMainImages() {
        return await this.database.mainImage.count({
            where: {
                isDefault: true,
            },
        });
    }
    updateMainImageDefaultToFalse() {
        return this.database.mainImage.updateMany({
            where: {
                isDefault: true,
            },
            data: {
                isDefault: false,
            },
        });
    }
    async countDefaultSlogan() {
        return await this.database.slogan.count({
            where: {
                isDefault: true,
            },
        });
    }
    updateSloganDefaultToFalse() {
        return this.database.slogan.updateMany({
            where: {
                isDefault: true,
            },
            data: {
                isDefault: false,
            },
        });
    }
};
MainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MainService);
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map