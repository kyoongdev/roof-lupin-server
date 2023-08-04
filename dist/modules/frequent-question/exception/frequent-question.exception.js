"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrequentQuestionException = void 0;
const common_1 = require("@nestjs/common");
class FrequentQuestionException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.FrequentQuestionException = FrequentQuestionException;
//# sourceMappingURL=frequent-question.exception.js.map