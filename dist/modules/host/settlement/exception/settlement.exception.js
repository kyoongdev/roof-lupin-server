"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementException = void 0;
const common_1 = require("@nestjs/common");
class SettlementException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.SettlementException = SettlementException;
//# sourceMappingURL=settlement.exception.js.map