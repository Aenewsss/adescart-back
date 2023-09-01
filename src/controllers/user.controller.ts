import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get('/listAll')
  async getAll(): Promise<UserDto[]> {
    try {
      const response = await this.userService.getAll();

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Post('/create-user')
  async createUser(@Body() user): Promise<UserDto> {
    try {
      const response = await this.userService.create(user);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Put("/update-user/:id")
  async updateUser(@Param() params, @Body() user): Promise<UserDto> {
    try {
      const response = await this.userService.updateUser(params.id, user);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Delete('remove/:id')
  async deleteUser(@Param() params): Promise<UserDto> {
    try {
      const response = await this.userService.deleteUser(params.id);

      return response;
    } catch (error) {
      return error.message;
    }
  }
}