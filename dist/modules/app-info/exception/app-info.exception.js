"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoException = void 0;
const common_1 = require("@nestjs/common");
class AppInfoException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.AppInfoException = AppInfoException;
//# sourceMappingURL=app-info.exception.js.map