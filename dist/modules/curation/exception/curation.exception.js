"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurationException = void 0;
const common_1 = require("@nestjs/common");
class CurationException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.CurationException = CurationException;
//# sourceMappingURL=curation.exception.js.map