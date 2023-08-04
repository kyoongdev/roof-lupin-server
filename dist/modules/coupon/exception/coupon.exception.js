"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponException = void 0;
const common_1 = require("@nestjs/common");
class CouponException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.CouponException = CouponException;
//# sourceMappingURL=coupon.exception.js.map