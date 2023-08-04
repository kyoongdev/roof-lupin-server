"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHostDTO = void 0;
const common_1 = require("../../../common");
class BaseHostDTO extends common_1.DateDTO {
    hostGenderConverter(gender) {
        if (gender === 1) {
            return '남성';
        }
        else if (gender === 2) {
            return '여성';
        }
        return undefined;
    }
}
exports.BaseHostDTO = BaseHostDTO;
//# sourceMappingURL=base-host.dto.js.map