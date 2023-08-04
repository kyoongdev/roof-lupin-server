"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportException = void 0;
const common_1 = require("@nestjs/common");
class ReportException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.ReportException = ReportException;
//# sourceMappingURL=report.exception.js.map