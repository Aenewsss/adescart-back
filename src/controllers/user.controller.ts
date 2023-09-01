import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/find/:id')
  async getUser(@Param() params): Promise<UserDto> {
    try {
      const response = await this.userService.findUserById(params.id);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Post('/auth')
  async authenticate(@Body() user): Promise<UserDto> {
    try {
      const response = await this.userService.findUser(user);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Post('/change-password')
  async changePassword(@Body() dto: { email: string, newPassword: string, repeatPassword: string }) {
    try {
      const user = await this.userService.findUserByEmail(dto.email)

      if (!user) throw Error("User not found")

      if(dto.newPassword !== dto.repeatPassword) throw Error("Password must be equal")      
      
      const result = this.userService.changePassword(user.id, dto.newPassword)      

      return result
    } catch (e) {
      return e.message
    }
  }

}