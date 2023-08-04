"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interceptors = void 0;
const core_1 = require("@nestjs/core");
const revalidate_1 = require("../aop/revalidate");
const cache_1 = require("../cache");
__exportStar(require("./data.interceptor"), exports);
__exportStar(require("./response-with-id.interceptor"), exports);
__exportStar(require("./user-cookie.interceptor"), exports);
exports.Interceptors = [
    {
        useClass: cache_1.CreateCacheDecorator,
        provide: core_1.APP_INTERCEPTOR,
    },
    {
        useClass: cache_1.DeleteCacheDecorator,
        provide: core_1.APP_INTERCEPTOR,
    },
    {
        useClass: revalidate_1.RevalidateApiDecorator,
        provide: core_1.APP_INTERCEPTOR,
    },
];
//# sourceMappingURL=index.js.map