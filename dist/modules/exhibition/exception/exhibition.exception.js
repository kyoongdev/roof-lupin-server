"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExhibitionException = void 0;
const common_1 = require("@nestjs/common");
class ExhibitionException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.ExhibitionException = ExhibitionException;
//# sourceMappingURL=exhibition.exception.js.map