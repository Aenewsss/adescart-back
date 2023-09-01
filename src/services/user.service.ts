import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
import { UserDto } from '../database/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findUserById(id: string): Promise<UserDto> {
    return await this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    return await this.userModel.findOne({ email })
  }

  async changePassword(id: string, password: string) {
    return await this.userModel.findByIdAndUpdate(id, {
      $set: {
        password
      }
    })
  }

  async create(dto) {
    const user = await this.userModel.create(dto)
    return user.save()
  }

}
