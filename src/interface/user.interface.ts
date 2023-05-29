export const SOCIAL_TYPE = {
  kakao: 'kakao',
  naver: 'naver',
  apple: 'apple',
};

export type UserGender = '남성' | '여성';

export type SocialType = keyof typeof SOCIAL_TYPE;
