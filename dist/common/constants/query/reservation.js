"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationInclude = void 0;
const dto_1 = require("../../../modules/space/dto");
exports.reservationInclude = {
    user: true,
    rentalTypes: {
        include: {
            rentalType: {
                include: {
                    timeCostInfo: true,
                    space: {
                        include: dto_1.SpaceDTO.getSpacesIncludeOption(),
                    },
                    additionalServices: true,
                },
            },
        },
    },
    spaceReviews: true,
};
//# sourceMappingURL=reservation.js.map