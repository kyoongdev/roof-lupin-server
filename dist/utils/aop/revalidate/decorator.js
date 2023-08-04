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
exports.RevalidateApiDecorator = exports.RevalidateApi = exports.REVALIDATE_API = void 0;
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const aop_decorator_1 = require("../aop.decorator");
const utils_1 = require("../utils");
exports.REVALIDATE_API = Symbol('REVALIDATE_API');
const RevalidateApi = (data) => (0, utils_1.createAOPDecorator)(exports.REVALIDATE_API, data);
exports.RevalidateApi = RevalidateApi;
let RevalidateApiDecorator = class RevalidateApiDecorator {
    constructor(configService) {
        this.configService = configService;
    }
    execute({ method, metadata }) {
        return async (...args) => {
            const originResult = await method(...args);
            try {
                await Promise.all(metadata.map(async (data) => {
                    const path = this.parseTarget(data.key, data.index, ...args);
                    await axios_1.default.get(`${this.configService.get('CLIENT_URL')}${path}`);
                }));
                return originResult;
            }
            catch (err) {
                return originResult;
            }
        };
    }
    parseTarget(key, index, ...args) {
        const metaData = key.startsWith('/') ? key : `/${key}`;
        if (index && metaData.includes(':')) {
            const id = args[index];
            const path = metaData.split('/').reduce((acc, next, index) => {
                if (next.includes(':')) {
                    acc += `/${id}`;
                }
                else {
                    acc += index === 0 ? next : `/${next}`;
                }
                return acc;
            }, '');
            return path;
        }
        else {
            return key;
        }
    }
};
RevalidateApiDecorator = __decorate([
    (0, aop_decorator_1.AOP)(exports.REVALIDATE_API),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RevalidateApiDecorator);
exports.RevalidateApiDecorator = RevalidateApiDecorator;
//# sourceMappingURL=decorator.js.map