"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmException = void 0;
const common_1 = require("@nestjs/common");
class AlarmException extends common_1.HttpException {
    constructor(error) {
        super(error.message, error.code);
    }
}
exports.AlarmException = AlarmException;
//# sourceMappingURL=alarm.exception.js.map