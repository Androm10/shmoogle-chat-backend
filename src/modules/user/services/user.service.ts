import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { USER_REPOSITORY } from 'src/common/constants/tokens';
import { IUserRepository } from 'src/core/interfaces/user-repository.interface';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
  ) {}

  async get(id: string) {
    const user = await this.userRepository.get(id);

    if (!user) {
      throw new NotFoundException('no such user');
    }

    return user;
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getByLogin(login: string) {
    return await this.userRepository.getByLogin(login);
  }

  async registerUser(dto: SignupDto) {
    return await this.userRepository.registerUser(dto);
  }

  async create(dto: CreateUserDto) {
    //do unique login check
    try {
      const createdUser = await this.userRepository.create(dto);
      return createdUser;
    } catch (error) {
      throw new BadRequestException('Cannot create user', error.message);
    }
  }
}
