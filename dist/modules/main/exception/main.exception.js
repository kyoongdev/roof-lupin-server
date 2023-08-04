"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainException = void 0;
const common_1 = require("@nestjs/common");
class MainException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.MainException = MainException;
//# sourceMappingURL=main.exception.js.map