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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCacheDecorator = exports.CreateCacheDecorator = exports.DeleteCache = exports.CreateCache = exports.DELETE_CACHE = exports.CREATE_CACHE = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const aop_1 = require("../aop");
const utils_1 = require("../aop/utils");
exports.CREATE_CACHE = Symbol('CREATE_CACHE');
exports.DELETE_CACHE = Symbol('DELETE_CACHE');
const CreateCache = (options) => (0, utils_1.createAOPDecorator)(exports.CREATE_CACHE, options);
exports.CreateCache = CreateCache;
const DeleteCache = (...key) => (0, utils_1.createAOPDecorator)(exports.DELETE_CACHE, key);
exports.DeleteCache = DeleteCache;
let CreateCacheDecorator = class CreateCacheDecorator {
    constructor(cache) {
        this.cache = cache;
    }
    execute({ method, metadata }) {
        return async (...args) => {
            const originResult = await method(...args);
            const isCacheExist = await this.cache.get(metadata.key);
            if (isCacheExist) {
                return isCacheExist;
            }
            else {
                originResult && (await this.cache.set(metadata.key, originResult, metadata.ttl));
            }
            return originResult;
        };
    }
};
CreateCacheDecorator = __decorate([
    (0, aop_1.AOP)(exports.CREATE_CACHE),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CreateCacheDecorator);
exports.CreateCacheDecorator = CreateCacheDecorator;
let DeleteCacheDecorator = class DeleteCacheDecorator {
    constructor(cache) {
        this.cache = cache;
    }
    execute({ method, metadata }) {
        return async (...args) => {
            const originResult = await method(...args);
            metadata.forEach(async (key) => {
                const isCacheExist = await this.cache.get(key);
                if (isCacheExist) {
                    await this.cache.del(key);
                }
            });
            return originResult;
        };
    }
};
DeleteCacheDecorator = __decorate([
    (0, aop_1.AOP)(exports.DELETE_CACHE),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], DeleteCacheDecorator);
exports.DeleteCacheDecorator = DeleteCacheDecorator;
//# sourceMappingURL=decorator.js.map