import { PrismaService } from '@/database/prisma.service';
import { CommonUserDTO, CreateSocialUserDTO, PushTokenDTO, UpdateUserDTO } from './dto';
export declare class UserRepository {
    private readonly database;
    constructor(database: PrismaService);
    findUser(id: string): Promise<CommonUserDTO>;
    findUserPushToken(id: string): Promise<PushTokenDTO>;
    findUserByEmail(email: string): Promise<CommonUserDTO>;
    findUserByNickname(nickname: string): Promise<CommonUserDTO>;
    findUserBySocialId(socialId: string): Promise<import(".prisma/client").User>;
    checkUserIsBlocked(id: string): Promise<{
        isBlocked: boolean;
        unBlockAt: Date;
    }>;
    checkUserBySocialId(socialId: string): Promise<CommonUserDTO>;
    checkUserByPhoneNumber(phoneNumber: string): Promise<import(".prisma/client").User>;
    createSocialUser(props: CreateSocialUserDTO): Promise<string>;
    updateUser(id: string, data: UpdateUserDTO): Promise<void>;
    login(id: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
