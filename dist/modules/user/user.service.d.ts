import { CommonUserDTO, UpdateUserDTO } from './dto';
import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findUser(id: string): Promise<CommonUserDTO>;
    findMyPushToken(id: string): Promise<import("./dto").PushTokenDTO>;
    updateUser(id: string, data: UpdateUserDTO): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
