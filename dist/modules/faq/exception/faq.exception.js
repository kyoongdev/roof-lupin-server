"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQException = void 0;
const common_1 = require("@nestjs/common");
class FAQException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.FAQException = FAQException;
//# sourceMappingURL=faq.exception.js.map