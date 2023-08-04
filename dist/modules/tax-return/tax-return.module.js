"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxReturnModule = void 0;
const common_1 = require("@nestjs/common");
const tax_return_controller_1 = require("./tax-return.controller");
const tax_return_repository_1 = require("./tax-return.repository");
const tax_return_service_1 = require("./tax-return.service");
let TaxReturnModule = class TaxReturnModule {
};
TaxReturnModule = __decorate([
    (0, common_1.Module)({
        controllers: [tax_return_controller_1.TaxReturnController],
        providers: [tax_return_service_1.TaxReturnService, tax_return_repository_1.TaxReturnRepository],
    })
], TaxReturnModule);
exports.TaxReturnModule = TaxReturnModule;
//# sourceMappingURL=tax-return.module.js.map