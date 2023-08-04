"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceSortValidation = exports.SpaceSortValidateConstraint = exports.SPACE_SORT_OPTION_VALUES = exports.SPACE_SORT_OPTION = void 0;
const class_validator_1 = require("class-validator");
const base_validator_1 = require("../../../../utils/validation/base-validator");
exports.SPACE_SORT_OPTION = {
    POPULARITY: 'POPULARITY',
    RECENT: 'RECENT',
    DISTANCE: 'DISTANCE',
    PRICE_HIGH: 'PRICE_HIGH',
    PRICE_LOW: 'PRICE_LOW',
};
exports.SPACE_SORT_OPTION_VALUES = Object.values(exports.SPACE_SORT_OPTION);
let SpaceSortValidateConstraint = class SpaceSortValidateConstraint {
    validate(value, validationArguments) {
        if (!exports.SPACE_SORT_OPTION_VALUES.includes(value))
            return false;
        return true;
    }
};
SpaceSortValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], SpaceSortValidateConstraint);
exports.SpaceSortValidateConstraint = SpaceSortValidateConstraint;
exports.SpaceSortValidation = (0, base_validator_1.BaseValidator)(SpaceSortValidateConstraint, '정렬 옵션은 다음 중 하나여야 합니다: ' + exports.SPACE_SORT_OPTION_VALUES.join(', ') + '.');
//# sourceMappingURL=space-sort.validation.js.map