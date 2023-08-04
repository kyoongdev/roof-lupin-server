"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentException = void 0;
const common_1 = require("@nestjs/common");
class PaymentException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.PaymentException = PaymentException;
//# sourceMappingURL=payment.exception.js.map