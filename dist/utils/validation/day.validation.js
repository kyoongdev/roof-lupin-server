"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayReqDecorator = exports.DayResDecorator = exports.DayResponseTransForm = exports.DayRequestTransForm = exports.dayNumberToString = exports.dayStringToNumber = exports.DayValidation = exports.DayValidateConstraint = exports.getDay = exports.DAY_VALUES = exports.DAY_KEYS = exports.DAY_ENUM = exports.DAY = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_validator_1 = require("./base-validator");
exports.DAY = {
    MONDAY: 'MONDAY',
    TUESDAY: 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY',
    THURSDAY: 'THURSDAY',
    FRIDAY: 'FRIDAY',
    SATURDAY: 'SATURDAY',
    SUNDAY: 'SUNDAY',
    HOLIDAY: 'HOLIDAY',
};
var DAY_ENUM;
(function (DAY_ENUM) {
    DAY_ENUM[DAY_ENUM["SUNDAY"] = 0] = "SUNDAY";
    DAY_ENUM[DAY_ENUM["MONDAY"] = 1] = "MONDAY";
    DAY_ENUM[DAY_ENUM["TUESDAY"] = 2] = "TUESDAY";
    DAY_ENUM[DAY_ENUM["WEDNESDAY"] = 3] = "WEDNESDAY";
    DAY_ENUM[DAY_ENUM["THURSDAY"] = 4] = "THURSDAY";
    DAY_ENUM[DAY_ENUM["FRIDAY"] = 5] = "FRIDAY";
    DAY_ENUM[DAY_ENUM["SATURDAY"] = 6] = "SATURDAY";
    DAY_ENUM[DAY_ENUM["HOLIDAY"] = 7] = "HOLIDAY";
})(DAY_ENUM = exports.DAY_ENUM || (exports.DAY_ENUM = {}));
exports.DAY_KEYS = Object.keys(exports.DAY);
exports.DAY_VALUES = Object.values(exports.DAY);
const getDay = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return date.getDay();
};
exports.getDay = getDay;
let DayValidateConstraint = class DayValidateConstraint {
    validate(value, validationArguments) {
        if (value !== DAY_ENUM.SUNDAY &&
            value !== DAY_ENUM.MONDAY &&
            value !== DAY_ENUM.TUESDAY &&
            value !== DAY_ENUM.WEDNESDAY &&
            value !== DAY_ENUM.THURSDAY &&
            value !== DAY_ENUM.FRIDAY &&
            value !== DAY_ENUM.SATURDAY &&
            value !== DAY_ENUM.HOLIDAY)
            return false;
        return true;
    }
};
DayValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], DayValidateConstraint);
exports.DayValidateConstraint = DayValidateConstraint;
exports.DayValidation = (0, base_validator_1.BaseValidator)(DayValidateConstraint, 'day 옵션은 다음 중 하나여야 합니다: ' + exports.DAY_VALUES.join(', ') + '.');
const dayStringToNumber = (day) => {
    switch (day) {
        case exports.DAY.MONDAY:
            return DAY_ENUM.MONDAY;
        case exports.DAY.TUESDAY:
            return DAY_ENUM.TUESDAY;
        case exports.DAY.WEDNESDAY:
            return DAY_ENUM.WEDNESDAY;
        case exports.DAY.THURSDAY:
            return DAY_ENUM.THURSDAY;
        case exports.DAY.FRIDAY:
            return DAY_ENUM.FRIDAY;
        case exports.DAY.SATURDAY:
            return DAY_ENUM.SATURDAY;
        case exports.DAY.SUNDAY:
            return DAY_ENUM.SUNDAY;
        case exports.DAY.HOLIDAY:
            return DAY_ENUM.HOLIDAY;
        default:
            return null;
    }
};
exports.dayStringToNumber = dayStringToNumber;
const dayNumberToString = (day) => {
    switch (day) {
        case DAY_ENUM.MONDAY:
            return exports.DAY.MONDAY;
        case DAY_ENUM.TUESDAY:
            return exports.DAY.TUESDAY;
        case DAY_ENUM.WEDNESDAY:
            return exports.DAY.WEDNESDAY;
        case DAY_ENUM.THURSDAY:
            return exports.DAY.THURSDAY;
        case DAY_ENUM.FRIDAY:
            return exports.DAY.FRIDAY;
        case DAY_ENUM.SATURDAY:
            return exports.DAY.SATURDAY;
        case DAY_ENUM.SUNDAY:
            return exports.DAY.SUNDAY;
        case DAY_ENUM.HOLIDAY:
            return exports.DAY.HOLIDAY;
        default:
            return null;
    }
};
exports.dayNumberToString = dayNumberToString;
const DayRequestTransForm = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.dayStringToNumber)(value));
exports.DayRequestTransForm = DayRequestTransForm;
const DayResponseTransForm = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.dayNumberToString)(value));
exports.DayResponseTransForm = DayResponseTransForm;
const DayResDecorator = (nullable = false) => (0, common_1.applyDecorators)((0, exports.DayResponseTransForm)(), (0, swagger_1.ApiProperty)({
    description: '요일',
    enum: exports.DAY_VALUES,
    type: 'string',
    example: exports.DAY_VALUES.join(' | '),
    nullable,
}));
exports.DayResDecorator = DayResDecorator;
const DayReqDecorator = (nullable = false) => (0, common_1.applyDecorators)((0, exports.DayRequestTransForm)(), (0, exports.DayValidation)(), (0, swagger_1.ApiProperty)({
    description: '요일',
    enum: exports.DAY_VALUES,
    nullable,
    type: 'string',
    example: exports.DAY_VALUES.join(' | '),
}));
exports.DayReqDecorator = DayReqDecorator;
//# sourceMappingURL=day.validation.js.map