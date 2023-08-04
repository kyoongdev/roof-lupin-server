"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedTimeException = void 0;
const common_1 = require("@nestjs/common");
class BlockedTimeException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.BlockedTimeException = BlockedTimeException;
//# sourceMappingURL=blocked-time.js.map