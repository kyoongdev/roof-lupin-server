"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDetailDTO = void 0;
const admin_dto_1 = require("./admin.dto");
class AdminDetailDTO extends admin_dto_1.AdminDTO {
    constructor(props) {
        super(props);
        this.password = props.password;
        this.salt = props.salt;
    }
}
exports.AdminDetailDTO = AdminDetailDTO;
//# sourceMappingURL=admin-detail.dto.js.map