"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptProvider = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = __importDefault(require("crypto"));
const common_exception_1 = require("./exception/common.exception");
const errorCode_1 = require("./exception/errorCode");
let EncryptProvider = class EncryptProvider {
    comparePassword(salt, password, hashedPassword) {
        try {
            return this.hashPassword(salt, password) === hashedPassword;
        }
        catch (err) {
            throw new common_exception_1.CommonException(errorCode_1.COMMON_ERROR_CODE.INTERNAL_SERVER_ERROR(errorCode_1.ENCRYPT_ERROR));
        }
    }
    hashPassword(salt, password) {
        try {
            return crypto_1.default.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('base64');
        }
        catch (err) {
            throw new common_exception_1.CommonException(errorCode_1.COMMON_ERROR_CODE.INTERNAL_SERVER_ERROR(errorCode_1.ENCRYPT_ERROR));
        }
    }
    createSalt() {
        try {
            return crypto_1.default.randomBytes(32).toString('base64');
        }
        catch (err) {
            throw new common_exception_1.CommonException(errorCode_1.COMMON_ERROR_CODE.INTERNAL_SERVER_ERROR(errorCode_1.ENCRYPT_ERROR));
        }
    }
};
EncryptProvider = __decorate([
    (0, common_1.Injectable)()
], EncryptProvider);
exports.EncryptProvider = EncryptProvider;
//# sourceMappingURL=encrypt.js.map