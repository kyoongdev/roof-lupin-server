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
exports.TermsService = void 0;
const common_1 = require("@nestjs/common");
const terms_1 = require("../../common/constants/terms");
const file_service_1 = require("../file/file.service");
const dto_1 = require("./dto");
let TermsService = class TermsService {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async getTerms() {
        const keys = [...Object.values(terms_1.GUEST_TERMS), ...Object.values(terms_1.HOST_TERMS)];
        await Promise.all(keys.map(async (key) => {
            const s3Body = await this.fileService.getFile(key);
            const content = s3Body ? await s3Body.transformToString() : null;
            return new dto_1.TermDTO({
                id: key,
                name: key,
                content,
            });
        }));
    }
    async getTerm(key) {
        const s3Body = await this.fileService.getFile(key);
        const content = s3Body ? await s3Body.transformToString() : null;
        return new dto_1.TermDTO({
            id: key,
            name: key,
            content,
        });
    }
};
TermsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], TermsService);
exports.TermsService = TermsService;
//# sourceMappingURL=terms.service.js.map