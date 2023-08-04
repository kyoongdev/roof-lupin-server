"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QnAException = void 0;
const common_1 = require("@nestjs/common");
class QnAException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.QnAException = QnAException;
//# sourceMappingURL=qna.exception.js.map