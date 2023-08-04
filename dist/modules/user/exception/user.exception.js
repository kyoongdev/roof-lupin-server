"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserException = void 0;
const common_1 = require("@nestjs/common");
class UserException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.UserException = UserException;
//# sourceMappingURL=user.exception.js.map