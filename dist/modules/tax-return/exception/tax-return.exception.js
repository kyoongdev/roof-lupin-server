"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxReturnException = void 0;
const common_1 = require("@nestjs/common");
class TaxReturnException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.TaxReturnException = TaxReturnException;
//# sourceMappingURL=tax-return.exception.js.map