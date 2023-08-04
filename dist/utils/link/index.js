"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicLinkProvider = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let DynamicLinkProvider = class DynamicLinkProvider {
    constructor() {
        this.apiClient = axios_1.default.create({
            baseURL: 'https://firebasedynamiclinks.googleapis.com/v1',
        });
    }
    async createDynamicLink(endPoint) {
        const response = await this.apiClient.post('/shortLinks', {
            dynamicLinkInfo: {
                domainUriPrefix: 'https://rooflupin.page.link',
                link: `https://rooflupin.page.link/to?redirect=${endPoint}`,
                androidInfo: {
                    androidPackageName: 'com.cumuco.rooflupin',
                },
                iosInfo: {
                    iosBundleId: 'com.cumuco.rooflupin',
                },
            },
        }, {
            params: {
                key: 'api_key',
            },
        });
        return 'link';
    }
};
DynamicLinkProvider = __decorate([
    (0, common_1.Injectable)()
], DynamicLinkProvider);
exports.DynamicLinkProvider = DynamicLinkProvider;
//# sourceMappingURL=index.js.map