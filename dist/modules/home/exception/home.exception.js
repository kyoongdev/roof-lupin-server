"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeException = void 0;
const common_1 = require("@nestjs/common");
class HomeException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.HomeException = HomeException;
//# sourceMappingURL=home.exception.js.map