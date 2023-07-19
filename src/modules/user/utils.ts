import type { SocialType, UserGender } from '@/interface/user.interface';

export const userGenderToNumber = (gender: UserGender): number => {
  if (gender === '남성') {
    return 1;
  } else {
    return 2;
  }
};

export const socialTypeToNumber = (socialType: SocialType): number => {
  if (socialType === 'kakao') {
    return 1;
  } else if (socialType === 'naver') {
    return 2;
  } else {
    //INFO: apple
    return 3;
  }
};

export const numberToSocialType = (socialType: number): SocialType => {
  if (socialType === 1) {
    return 'kakao';
  } else if (socialType === 2) {
    return 'naver';
  } else {
    //INFO: apple
    return 'apple';
  }
};
