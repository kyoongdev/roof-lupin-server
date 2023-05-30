import { Injectable } from '@nestjs/common';

import { CommonUserDTO } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(id: string) {
    const user = await this.userRepository.findUser(id);
    return new CommonUserDTO(user);
  }
}
