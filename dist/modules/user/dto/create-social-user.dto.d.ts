import { KakaoGetUser } from 'cumuco-nestjs';
import { type SocialType } from '@/interface/user.interface';
interface Props {
    name?: string;
    nickname: string;
    email?: string;
    phoneNumber?: string;
    birthDay?: string;
    birthYear?: string;
    gender?: number;
    profileImage?: string;
    socialId: string;
    socialType: SocialType;
}
export declare class CreateSocialUserDTO {
    name: string;
    nickname: string;
    email?: string;
    phoneNumber?: string;
    birthDay?: string;
    birthYear?: string;
    gender?: number;
    profileImage?: string;
    socialId: string;
    socialType: number;
    constructor(props?: Props);
    setKakaoUser(socialUser: KakaoGetUser): this;
    getKakaoUser(): this;
}
export {};
