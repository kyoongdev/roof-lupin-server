"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthException = void 0;
const common_1 = require("@nestjs/common");
class AuthException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.AuthException = AuthException;
//# sourceMappingURL=auth.exception.js.map