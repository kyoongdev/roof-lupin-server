"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSocialUserDTO = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
const utils_1 = require("../utils");
class CreateSocialUserDTO {
    constructor(props) {
        if (props) {
            if (props.phoneNumber && props.phoneNumber.includes('-'))
                props.phoneNumber = props.phoneNumber.replace(/-/g, '');
            this.name = props.name;
            this.nickname = props.nickname;
            this.email = props.email;
            this.phoneNumber = props.phoneNumber;
            this.birthDay = props.birthDay;
            this.birthYear = props.birthYear;
            this.gender = props.gender;
            this.profileImage = props.profileImage;
            this.socialId = props.socialId;
            this.socialType = (0, utils_1.socialTypeToNumber)(props.socialType);
        }
    }
    setKakaoUser(socialUser) {
        const account = socialUser.kakaoAccount;
        this.name = socialUser.kakaoAccount.name;
        this.nickname = socialUser.properties.nickname ?? '';
        this.socialId = `${socialUser.id}`;
        this.socialType = (0, utils_1.socialTypeToNumber)('kakao');
        this.birthDay = account.birthday;
        this.birthYear = account.birthyear;
        this.email = account.email;
        this.gender = account.gender ?? account.gender === 'male' ? 1 : account.gender === 'female' ? 2 : undefined;
        this.phoneNumber = account.phone_number;
        this.profileImage = socialUser.properties.profile_image;
        return this;
    }
    getKakaoUser() {
        return this;
    }
}
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', nullable: true, description: '이름' } }),
    __metadata("design:type", String)
], CreateSocialUserDTO.prototype, "name", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '닉네임' } }),
    __metadata("design:type", String)
], CreateSocialUserDTO.prototype, "nickname", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '이메일', nullable: true } }),
    __metadata("design:type", String)
], CreateSocialUserDTO.prototype, "email", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '연락처', nullable: true } }),
    __metadata("design:type", String)
], CreateSocialUserDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '생일 월일', nullable: true, minLength: 4, maxLength: 4 } }),
    __metadata("design:type", String)
], CreateSocialUserDTO.prototype, "birthDay", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '생일 연도', nullable: true, minLength: 4, maxLength: 4 } }),
    __metadata("design:type", String)
], CreateSocialUserDTO.prototype, "birthYear", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '성별', nullable: true } }),
    __metadata("design:type", Number)
], CreateSocialUserDTO.prototype, "gender", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '프로필 사진', nullable: true } }),
    __metadata("design:type", String)
], CreateSocialUserDTO.prototype, "profileImage", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'string', description: '소셜 ID' } }),
    __metadata("design:type", String)
], CreateSocialUserDTO.prototype, "socialId", void 0);
__decorate([
    (0, cumuco_nestjs_1.Property)({ apiProperty: { type: 'number', description: '1 = 카카오, 2 = 네이버 , 3 = 애플' } }),
    __metadata("design:type", Number)
], CreateSocialUserDTO.prototype, "socialType", void 0);
exports.CreateSocialUserDTO = CreateSocialUserDTO;
//# sourceMappingURL=create-social-user.dto.js.map