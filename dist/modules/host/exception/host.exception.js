"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostException = void 0;
const common_1 = require("@nestjs/common");
class HostException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.HostException = HostException;
//# sourceMappingURL=host.exception.js.map