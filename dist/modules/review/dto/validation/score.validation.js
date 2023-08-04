"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreValidation = exports.IsScoreValidateConstraint = void 0;
const class_validator_1 = require("class-validator");
const base_validator_1 = require("../../../../utils/validation/base-validator");
let IsScoreValidateConstraint = class IsScoreValidateConstraint {
    validate(value, validationArguments) {
        if (!Number.isInteger(value))
            return false;
        if (value < 0 || value > 5)
            return false;
        return true;
    }
};
IsScoreValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], IsScoreValidateConstraint);
exports.IsScoreValidateConstraint = IsScoreValidateConstraint;
exports.ScoreValidation = (0, base_validator_1.BaseValidator)(IsScoreValidateConstraint);
//# sourceMappingURL=score.validation.js.map