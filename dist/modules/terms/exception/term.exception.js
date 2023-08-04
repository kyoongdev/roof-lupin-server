"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermException = void 0;
const common_1 = require("@nestjs/common");
class TermException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.TermException = TermException;
//# sourceMappingURL=term.exception.js.map