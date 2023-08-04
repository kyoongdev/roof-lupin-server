"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUserDTO = void 0;
const common_1 = require("../../../common");
class BaseUserDTO extends common_1.DateDTO {
    userGenderConverter(gender) {
        if (gender === 1) {
            return '남성';
        }
        else if (gender === 2) {
            return '여성';
        }
        return null;
    }
}
exports.BaseUserDTO = BaseUserDTO;
//# sourceMappingURL=base-user.dto.js.map