"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminException = void 0;
const common_1 = require("@nestjs/common");
class AdminException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.AdminException = AdminException;
//# sourceMappingURL=admin.exception.js.map