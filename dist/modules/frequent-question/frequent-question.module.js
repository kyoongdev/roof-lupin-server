"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrequentQuestionModule = void 0;
const common_1 = require("@nestjs/common");
const frequent_question_controller_1 = require("./frequent-question.controller");
const frequent_question_repository_1 = require("./frequent-question.repository");
const frequent_question_service_1 = require("./frequent-question.service");
let FrequentQuestionModule = class FrequentQuestionModule {
};
FrequentQuestionModule = __decorate([
    (0, common_1.Module)({
        providers: [frequent_question_service_1.FrequentQuestionService, frequent_question_repository_1.FrequentQuestionRepository],
        controllers: [frequent_question_controller_1.FrequentQuestionController],
    })
], FrequentQuestionModule);
exports.FrequentQuestionModule = FrequentQuestionModule;
//# sourceMappingURL=frequent-question.module.js.map