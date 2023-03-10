import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserEntity } from 'src/core/entities/user.entity';
import { IUserRepository } from 'src/core/interfaces/user-repository.interface';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';
import { User, UserDocument } from 'src/mongoose/schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();

    return users.map((user) => UserEntity.fromObject(user));
  }

  async get(id: string): Promise<UserEntity> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        return null;
      }
      return UserEntity.fromObject(user);
    } catch (error) {
      throw new Error('Cannot find user');
    }
  }

  async registerUser(signupDto: SignupDto) {
    try {
      const registeredUser = new this.userModel(signupDto);
      await registeredUser.save();
      return UserEntity.fromObject(registeredUser);
    } catch (error) {
      //console.log('cannot create user because', error.message);
      throw new Error('Cannot create user');
    }
  }

  async create(item: any): Promise<UserEntity> {
    const createdUser = new this.userModel(item);
    await createdUser.save();
    return UserEntity.fromObject(createdUser);
  }

  async getByLogin(login: string): Promise<UserEntity> {
    const user = await this.userModel.findOne({ login: login });

    if (!user) {
      return null;
    }

    return UserEntity.fromObject(user);
  }

  update(id: string, item: any): Promise<UserEntity> {
    throw new NotImplementedException('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new NotImplementedException('Method not implemented.');
  }
}
