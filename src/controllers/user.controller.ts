import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDto } from '../database/dtos/user.dto';
import { UserService } from '../services/user.service';
import { ChangePasswordValidator } from "../validators/change-password.validator";
import { AuthValidator } from "../validators/auth.validator";
import * as bcrypt from "bcrypt"
import { ChangePasswordLoginValidator } from "../validators/change-password-login.validator";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "../guards/auth.guard";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  @UseGuards(AuthGuard)
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
  async authenticate(@Body() dto: AuthValidator): Promise<{ user: UserDto, acessToken: string }> {
    try {
      const user = await this.userService.findUserByEmail(dto.email)

      if (!user) throw new Error("User not found")

      if (!await bcrypt.compare(dto.password, user.password)) throw new Error("Email or password incorrect")

      const payload = { sub: user.id, username: user.email };

      return {
        user,
        acessToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  async changePassword(@Body() dto: ChangePasswordValidator) {
    try {
      const user = await this.userService.findUserByEmail(dto.email)

      if (!user) throw new Error("User not found")

      if (dto.newPassword !== dto.repeatPassword) throw new Error("Password must be equal")

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

      if (!user) throw new Error("User not found")

      if (dto.newPassword !== user.password) throw new Error("Old password doesn't match")

      const hashPass = await this.hashPassword(dto.newPassword)

      const result = this.userService.changePassword(user.id, hashPass)

      return result
    } catch (e) {
      return e.message
    }
  }

  @UseGuards(AuthGuard)
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