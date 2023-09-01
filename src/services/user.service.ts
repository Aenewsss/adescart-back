import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: UserDto): Promise<UserDto> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findUserById(id: string): Promise<UserDto> {
    return await this.userModel.findById(id);
  }

  async findUser(user: UserDto): Promise<UserDto> {
    return await this.userModel.findOne({name: user.name, password: user.password});
  }

  async getAll(): Promise<UserDto[]> {
    return await this.userModel.find();
  }

  async updateUser(id: string, user: UserDto): Promise<UserDto> {
    const oldUser = await this.userModel.findByIdAndUpdate(id, user);
    return oldUser.save();
  }

  async deleteUser(id: string): Promise<UserDto> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
