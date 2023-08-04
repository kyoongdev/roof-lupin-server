"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSpaceSortValidation = exports.AdminSpaceSortValidateConstraint = exports.ADMIN_SPACE_SORT_OPTION_VALUES = exports.ADMIN_SPACE_SORT_OPTION = void 0;
const class_validator_1 = require("class-validator");
const base_validator_1 = require("../../../../utils/validation/base-validator");
exports.ADMIN_SPACE_SORT_OPTION = {
    RECENT: 'RECENT',
    PRICE_HIGH: 'PRICE_HIGH',
    PRICE_LOW: 'PRICE_LOW',
    REVIEW_COUNT_HIGH: 'REVIEW_COUNT_HIGH',
    REVIEW_COUNT_LOW: 'REVIEW_COUNT_LOW',
    AVERAGE_RATING_HIGH: 'AVERAGE_RATING_HIGH',
    AVERAGE_RATING_LOW: 'AVERAGE_RATING_LOW',
};
exports.ADMIN_SPACE_SORT_OPTION_VALUES = Object.values(exports.ADMIN_SPACE_SORT_OPTION);
let AdminSpaceSortValidateConstraint = class AdminSpaceSortValidateConstraint {
    validate(value, validationArguments) {
        if (!exports.ADMIN_SPACE_SORT_OPTION_VALUES.includes(value))
            return false;
        return true;
    }
};
AdminSpaceSortValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], AdminSpaceSortValidateConstraint);
exports.AdminSpaceSortValidateConstraint = AdminSpaceSortValidateConstraint;
exports.AdminSpaceSortValidation = (0, base_validator_1.BaseValidator)(AdminSpaceSortValidateConstraint, '정렬 옵션은 다음 중 하나여야 합니다: ' + exports.ADMIN_SPACE_SORT_OPTION_VALUES.join(', ') + '.');
//# sourceMappingURL=space-sort.validation.js.map