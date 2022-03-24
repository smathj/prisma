import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body) {
    return await this.userService.createUser(body);
  }

  @Patch()
  async updateUser(@Body() body) {
    return await this.userService.updateUser(body);
  }

  @Get(':id')
  async findUser(@Param() param) {
    const result = await this.userService.findUser(+param.id);
    //* 가능
    for (let key in result) {
      result[key] === null ? (result[key] = '') : (result[key] = result[key]);
    }
    return result;
  }
}
