"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalTypeValidation = exports.ReviewScoreValidateConstraint = exports.REVIEWS_SORT_KEYS = exports.REVIEWS_SORT = void 0;
const class_validator_1 = require("class-validator");
const validation_1 = require("../../../../utils/validation");
exports.REVIEWS_SORT = {
    CREATED_AT: 'CREATED_AT',
    SCORE_HIGH: 'SCORE_HIGH',
    SCORE_LOW: 'SCORE_LOW',
};
exports.REVIEWS_SORT_KEYS = Object.keys(exports.REVIEWS_SORT);
let ReviewScoreValidateConstraint = class ReviewScoreValidateConstraint {
    validate(value, validationArguments) {
        if (value !== exports.REVIEWS_SORT.SCORE_HIGH && value !== exports.REVIEWS_SORT.SCORE_LOW && value !== exports.REVIEWS_SORT.CREATED_AT)
            return false;
        return true;
    }
};
ReviewScoreValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], ReviewScoreValidateConstraint);
exports.ReviewScoreValidateConstraint = ReviewScoreValidateConstraint;
exports.RentalTypeValidation = (0, validation_1.BaseValidator)(ReviewScoreValidateConstraint, 'sort 옵션은 다음 중 하나여야 합니다: ' + exports.REVIEWS_SORT_KEYS.join(', ') + '.');
//# sourceMappingURL=reviews-sort.validation.js.map