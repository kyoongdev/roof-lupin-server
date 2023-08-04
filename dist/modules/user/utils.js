"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToSocialType = exports.socialTypeToNumber = exports.userGenderToNumber = void 0;
const userGenderToNumber = (gender) => {
    if (gender === '남성') {
        return 1;
    }
    else {
        return 2;
    }
};
exports.userGenderToNumber = userGenderToNumber;
const socialTypeToNumber = (socialType) => {
    if (socialType === 'kakao') {
        return 1;
    }
    else if (socialType === 'naver') {
        return 2;
    }
    else {
        return 3;
    }
};
exports.socialTypeToNumber = socialTypeToNumber;
const numberToSocialType = (socialType) => {
    if (socialType === 1) {
        return 'kakao';
    }
    else if (socialType === 2) {
        return 'naver';
    }
    else {
        return 'apple';
    }
};
exports.numberToSocialType = numberToSocialType;
//# sourceMappingURL=utils.js.map