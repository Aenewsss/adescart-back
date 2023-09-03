import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { UserDto } from '../database/dtos/user.dto';
import { UserService } from '../services/user.service';
import { IsString } from "class-validator";
import { ChangePasswordValidator } from "src/validators/change-password.validator";
import { AuthValidator } from "src/validators/auth.validator";
import * as bcrypt from "bcrypt"
import { ChangePasswordLoginValidator } from "src/validators/change-password-login.validator";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/find/:id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    try {
      const response = await this.userService.findUserById(id);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Post('/auth')
  async authenticate(@Body() dto: AuthValidator): Promise<UserDto> {
    try {
      const user = await this.userService.findUserByEmail(dto.email)

      if (!user) throw Error("User not found")

      if (!await bcrypt.compare(dto.password, user.password)) throw Error("Email or password incorrect")

      return user;
    } catch (error) {
      return error.message;
    }
  }


  @Post('/change-password')
  async changePassword(@Body() dto: ChangePasswordValidator) {
    try {
      const user = await this.userService.findUserByEmail(dto.email)

      if (!user) throw Error("User not found")

      if (dto.newPassword !== dto.repeatPassword) throw Error("Password must be equal")

      const hashPass = await this.hashPassword(dto.newPassword)

      const result = this.userService.changePassword(user.id, hashPass)

      return result
    } catch (e) {
      return e.message
    }
  }

  @Post('/change-password-login')
  async changePasswordLogin(@Body() dto: ChangePasswordLoginValidator) {
    try {
      const user = await this.userService.findUserByEmail(dto.email)

      if (!user) throw Error("User not found")

      if (dto.newPassword !== user.password) throw Error("Old password doesn't match")

      const hashPass = await this.hashPassword(dto.newPassword)

      const result = this.userService.changePassword(user.id, hashPass)

      return result
    } catch (e) {
      return e.message
    }
  }

  @Post()
  async createUser(@Body() dto: { name, email, password }) {
    const hashPass = await this.hashPassword(dto.password)

    return await this.userService.create({
      ...dto,
      password: hashPass
    })
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt(10))
  }

}

