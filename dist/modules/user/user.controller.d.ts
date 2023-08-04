import { RequestUser } from '@/interface/role.interface';
import { PushTokenDTO, UpdateUserDTO } from './dto';
import { CommonUserDTO } from './dto/common-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getMyPushToken(user: RequestUser): Promise<PushTokenDTO>;
    getMe(user: RequestUser): Promise<CommonUserDTO>;
    updateMe(user: RequestUser, body: UpdateUserDTO): Promise<void>;
    deleteMe(user: RequestUser): Promise<void>;
}
